<template>
  <div>
    <v-row>
      <v-col md="6">
        <v-card class="mx-auto" max-width="500" outlined>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="headline mb-1">Pedido Atual</v-list-item-title>
            </v-list-item-content>
            <v-list-item-content>
              <cesta :exib="true"></cesta>
              <v-btn color="error" @click="removeProdutos()" v-if="(cesta.length > 0)">Excluir itens</v-btn>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <div>
                <v-row>
                  <v-col cols="6">
                    <v-text-field label="Nome" :rules="rules" hide-details="auto" v-model="Pedido.name">
                    </v-text-field>
                    <v-divider inset></v-divider>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field label="Telefone" :rules="rules" hide-details="auto" v-model="Pedido.phone">
                    </v-text-field>
                    <v-divider inset></v-divider>
                  </v-col>
                  <v-row class="ml-0">
                    <v-col cols="12">
                      <v-text-field label="E-mail" :rules="emailRules" hide-details="auto" v-model="Pedido.email">
                      </v-text-field>
                      <v-divider inset></v-divider>
                    </v-col>
                  </v-row>
                  <v-row class="ml-0">
                    <v-col cols="9">
                      <v-text-field label="Endereço" v-model="Pedido.address" :rules="rules"></v-text-field>
                      <v-divider inset></v-divider>
                    </v-col>
                    <v-col cols="3">
                      <v-text-field label="Numero" v-model="Pedido.number" :rules="rulesNumber"></v-text-field>
                      <v-divider inset></v-divider>
                    </v-col>
                  </v-row>
                  <v-row class="ml-0">
                    <v-col>
                      <v-textarea label="Observação" v-model="Pedido.observation">{{}}</v-textarea>
                      <v-divider inset></v-divider>
                    </v-col>
                  </v-row>
                </v-row>
              </div>
              <div></div>
            </v-list-item-content>
          </v-list-item>

          <v-card-actions>
            <v-btn @click="finalizarPedido()" color="success"><strong v-if="this.Pedido.id == ''">Cria</strong><strong
                v-else>Salvar</strong></v-btn>
            <v-btn @click="cancelarPedido()" color="warning">Cancelar pedido</v-btn>
            <v-btn @click="excluirPedido()" color="error" v-if="this.Pedido.id != ''"><strong>Excluir</strong></v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col md="4">
        <v-card class="mx-auto" max-width="500" outlined>
          <v-list-item-content>
            <v-list-item-title class="headline mb-3 text-h5">
              Pedidos anteriores
            </v-list-item-title>
          </v-list-item-content>
          <v-list-item-content v-for="Pedido in this.pedidosLista" :key="Pedido.id">
            <v-card class="mx-auto" max-width="450" outlined>
              <v-list-item-content class="btn-Select" @click="exibiPedido(Pedido)">Nº Pedido: {{ Pedido.id }}:
                <span>Nome:</span>
                <em>{{ Pedido.name }}</em>
              </v-list-item-content>
            </v-card>
          </v-list-item-content>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import cesta from "../components/cesta.vue";
import { mapGetters, mapMutations } from "vuex";
export default {
  components: {
    cesta,
  },
  data() {
    return {
      rules: [
        (value) => !!value || "Obrigatorio.",
        (value) => (value && value.length >= 4) || "Míniomo 4 caracteres",
      ],
      rulesNumber: [(value) => !!value || "Obrigatorio."],
      emailRules: [
        (v) => !!v || "Obrigatorio",
        (v) => /.+@.+/.test(v) || "E-mail invalido",
      ],
    };
  },
  computed: {
    ...mapGetters(["listaCesta", "getPedidos", "getPedido"]),
    cesta() {
      return this.listaCesta;
    },
    pedidosLista() {
      return this.getPedidos;
    },
    Pedido() {
      return this.getPedido;
    },
  },
  methods: {
    ...mapMutations(["limpaCesta", "carregaCesta", "limpaPedido", "carregaPedidos", "carregaPedido"]),

    obterPedidos() {
      if (this.Pedido.length <= 0) {
        this.carregaPedido({
          id: '',
          name: '',
          phone: '',
          email: '',
          address: '',
          number: '',
          observation: ''
        })
      }

      this.$http.get("ListPedidos").then((res) => {
        const { Pedidos } = res.data;
        this.carregaPedidos(Pedidos);
      });
    },
    exibiPedido(pedido) {
      this.limpaCesta();
      this.limpaPedido();
      this.carregaPedido(pedido)
      if (this.cesta.length <= 0) {
        this.$http
          .post("PedidoProdutoList", { Info: { id: pedido.id } })
          .then((res) => {
            const { Pedidos } = res.data;
            this.carregaCesta(Pedidos);
          });
      }
    },
    cancelarPedido() {
      this.limpaPedido();
      this.limpaCesta();
    },
    finalizarPedido() {
      var dataAtual = new Date();
      var dia = dataAtual.getDate();
      var mes = (dataAtual.getMonth() + 1);
      var ano = dataAtual.getFullYear();
      var horas = dataAtual.getHours();
      var minutos = dataAtual.getMinutes();
      var segundos = dataAtual.getSeconds();
      const IDPedido = ano.toString() + dia.toString() + mes.toString() + horas.toString() + minutos.toString() + segundos.toString()
      if (this.Pedido.id == "") {
        this.Pedido.id = IDPedido
        const iten = {
          Info: {
            id: IDPedido,
            name: this.Pedido.name,
            phone: this.Pedido.phone,
            email: this.Pedido.email,
            address: this.Pedido.address,
            number: this.Pedido.number,
            observation: this.Pedido.observation
          },
        }
        this.$http.post("CriandoPedido", iten)
        this.salvaProdutos(IDPedido);
      } else {
        this.$http.post("SalvarPedido", this.Pedido);
        this.salvaProdutos(this.Pedido.id);
      }
      /*       this.cancelarPedido();
            this.obterPedidos(); */
    },
    salvaProdutos(id) {
      this.listaCesta.forEach((r) => {
        const Info = {
          Info: {
            idPedido: id,
            idProduto: r.id,
            quantity: r.quantity,
          },
        };
        this.$http.post("PedidoProduto", Info);
      });
    },
    removeProdutos() {
      this.limpaCesta();
      const Info = {
        Info: {
          idPedido: this.Pedido.id,
        },
      };
      this.$http
        .post("RemoveProduto", Info)
    },
    excluirPedido() {

      this.$http.post("ExcluirPedido", { Info: this.Pedido });
      this.cancelarPedido();
      this.obterPedidos();
      //this.$router.push("Pedido");
    },
  },
  beforeMount() {
    this.obterPedidos();
  },
};
</script>
<style>
.btn-Select {
  width: 100%;
  text-align: left;
}
</style>