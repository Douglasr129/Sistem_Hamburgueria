const { json } = require('neo4j-driver-core')
const neo4j = require('../neo4j')
const routes = (server) => {
    server.get('/', (req, res, next) => {
        res.send('Enjoy the silence...')
        next()
    })
    server.get('/Hanburgers', (req, res, next) => {
        neo4j.read(`MATCH(n:Categoria)<--(p:Produto)where n.type = 'Sanduiche' 
                    return p.id AS id, p.name AS name, p.description AS descripition, p.cust AS cust`)
            .then(result => {
                const Produtos = []
                
                result.records.forEach(r => {
                    //const { low } = r.get('id')
                    Produtos.push({
                        id: r.get('id'),
                        name: r.get('name'),
                        descripition: r.get('descripition'),
                        cust: r.get('cust')
                    })
                })
                return res.json({ Produtos })
            }).catch(next)
    })
    server.get('/Juices', (req, res, next) => {
        neo4j.read("MATCH(n:Categoria)<--(p:Produto)where n.type = 'juice' return p.id AS id, p.name AS name, p.description AS descripition, p.cust AS cust")
            .then(result => {
                const Produtos = []
                result.records.forEach(r => {
                    //const { low } = r.get('id')
                    Produtos.push({
                        id: r.get('id'),
                        name: r.get('name'),
                        descripition: r.get('descripition'),
                        cust: r.get('cust')
                    })
                })
                return res.json({ Produtos })
            }).catch(next)
    })
    server.get('/Additionals', (req, res, next) => {
        neo4j.read("MATCH(n:Categoria)<--(p:Produto)where n.type = 'Additional' return p.id AS id, p.name AS name, p.description AS descripition, p.cust AS cust")
            .then(result => {
                const Produtos = []
                result.records.forEach(r => {
                    //const { low } = r.get('id')
                    Produtos.push({
                        id: r.get('id'),
                        name: r.get('name'),
                        descripition: r.get('descripition'),
                        cust: r.get('cust')
                    })
                })
                return res.json({ Produtos })
            }).catch(next)
    })

    server.get('/ListPedidos', (req, res, next) => {
        neo4j.read(`MATCH (p:Pedido) RETURN p.id AS id, p.number AS number,p.address AS address,
            p.phone AS phone,p.observation AS observation, p.name AS name,p.email AS email`)
            .then(result => {
                const Pedidos = []
                result.records.forEach(r => {
                    //const { low } = r.get('ID(p)')
                    Pedidos.push({
                        id: r.get('id'),
                        name: r.get('name'),
                        phone: r.get('phone'),
                        email: r.get('email'),
                        address: r.get('address'),
                        number: r.get('number'),
                        observation: r.get('observation')
                    })
                })
                return res.json({ Pedidos })
            }).catch(next)
    })
    server.post('/CriandoPedido',async (req, res, next) => {
        const info = req.body
        neo4j.write(` create(p:Pedido{id:$Info.id, name:$Info.name,phone: $Info.phone, email: $Info.email, 
            address: $Info.address, number: $Info.number, observation: $Info.observation})
             return p.id as id, p.number AS number,p.address AS address,
            p.phone AS phone,p.observation AS observation, p.name AS name,p.email AS email`,
            info).then(result => {
                const Pedidos = []
                result.records.forEach(r => {
                    //const { low } = r.get('p.id')
                    Pedidos.push({
                        id: r.get('id'),
                        name: r.get('name'),
                        phone: r.get('phone'),
                        email: r.get('email'),
                        address: r.get('address'),
                        number: r.get('number'),
                        observation: r.get('observation')
                    })
                })
                return res.json({ Pedidos })
            }).catch(next)
    });
    server.put('/SalvarPedido', async (req, res, next) => {
        const info = req.body
        
        neo4j.write(` match(p:Pedido) where p.id = $Info.id
            set p.name = $Info.name,p.phone = $Info.phone, p.email = $Info.email, 
            p.address = $Info.address, p.number = $Info.number, p.observation = $Info.observation return p.id AS id, p.number AS number,p.address AS address,
            p.phone AS phone,p.observation AS observation, p.name AS name,p.email AS email`,
            info).then(result => {
                const Pedidos = []
                result.records.forEach(r => {
                    //const { low } = r.get('ID(p)')
                    Pedidos.push({
                        Pedidos: {
                            id: r.get('id'),
                            name: r.get('name'),
                            phone: r.get('phone'),
                            email: r.get('email'),
                            address: r.get('address'),
                            number: r.get('number'),
                            observation: r.get('observation')
                        }
                    })
                })
                return res.json({ Pedidos })
            }).catch(next)
    });
    server.post('/PedidoProduto', async (req, res, next) => {
        const info = req.body
        neo4j.write(`MATCH (n:Pedido) where n.id = $Info.idPedido  
                     MATCH (p:Produto) where p.id = $Info.idProduto
                     CREATE (n)<-[:quantity{value:$Info.quantity}]-(p) return n`,
            info).then(result => {
                return res.json({ result })
            }).catch(next);
    });
    server.post('/RemoveProduto', async (req, res, next) => {
        const info = req.body
        neo4j.write(`MATCH(ped:Pedido) where ped.id = $Info.idPedido
                        MATCH(prod:Produto)-[quant:quantity]->(ped)
                        DETACH DELETE quant return prod`,
            info).then(result => {
                return res.json({ result })
            }).catch(next);
    });
    server.post('/PedidoProdutoList', async (req, res, next) => {
        const info = req.body
        neo4j.read(`MATCH (n:Pedido) where n.id = 	$Info.id
                    MATCH (n)<-[q:quantity]-(p:Produto)
                    return ID(p) AS id, q.value AS quantity, 
                    p.name AS name, p.description AS descripition, p.cust AS cust`,
            info).then(result => {
                const Pedidos = []
                result.records.forEach(r => {
                    Pedidos.push({
                        id: r.get('id'),
                        name: r.get('name'),
                        descripition: r.get('descripition'),
                        cust: r.get('cust'),
                        quantity: r.get('quantity'),
                    })
                })
                return res.json({ Pedidos })
            }).catch(next);
    });
    server.post('/ExcluirPedido', async (req, res, next) => {
        const Info = req.body
        neo4j.write(`MATCH (n:Pedido) where n.id = $Info.id DETACH DELETE n`,
            Info).catch(next)
    });


    /*     server.post('/categoria', (req, res, next) => {
            const { nome } = req.params
            res.send(nome)
            next()
        }) */
    /*   server.put('categoria', (req, res,next) =>{
           res.send()
           next()
       })
       server.delete('categoria', (req, res,next) =>{
           res.send()
           next()
       }) */
}

module.exports = routes