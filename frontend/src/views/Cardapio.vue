<template>
  <div class="Cardapio">
    <v-row justify="start" @load="obterProdutos()">
      <v-col md="4">
        <h2>Hamburgueres</h2>
        <div v-for="(hamburger) in hamburgers" :key="hamburger.name">
          <itens :produto="hamburger" color="#FFEDDB">
          </itens>
        </div>
      </v-col>
      <v-col md="4">
        <v-row>
          <v-col>
            <v-row>
              <v-col>
                <h2>Sucos</h2>
                <div v-for="(juice) in juices" :key="juice.name">
                  <itens :produto="juice" color="#FFDCDB">
                  </itens>
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <h2>Adicionais</h2>
                <div v-for="(additional) in additionals" :key="additional.name">
                  <itens :produto="additional" color="#F9FBEA"></itens>
                </div>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
      <v-col md="4">
        <v-row>
          <v-col>
            <h2>Cesta</h2>
            <div>
              <cesta></cesta>
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import itens from "../components/itens.vue";
import cesta from "../components/cesta.vue";
//const retHttp = this.$http.get('BuscaSanduiches').then(res => res.data)
export default {
  components: { itens, cesta },
  data() {
    return {
      produtos: [],
      produto: {
        name: '',
        description: '',
        cust: ''
      }
    }
  },
  computed: {
    hamburgers() {
      return this.$store.state.hamburgers
    },
    juices() {
      return this.$store.state.juices
    },
    additionals() {
      return this.$store.state.Additionals
    }
  },
  methods: {
    obterProdutos() {
      this.$http.get('BuscaSanduiches').then(res => {
        const { Produtos } = res.data
        this.produtos = Produtos
        return this.produtos
      })
    }
  },
};
</script>
<style>
.Cardapio h2 {
  font-family: 'Lobster', cursive;
  font-size: 30px;
}
</style>