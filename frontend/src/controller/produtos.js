module.exports = {
    carregaProdutos(){
        return this.$http.get(`/BuscaSanduiches`)
    }
}

