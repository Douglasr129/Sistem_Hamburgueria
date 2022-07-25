<template>
  <v-app class="app">
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant.sync="mini"
      mini-variant-width="80px"
      app
      permanent
    >
      <v-sheet color="grey lighten-3 logo" @click.stop="mini = !mini">
        <v-avatar class="mb-4 ml-2 mt-4" color="grey darken" size="60"
          ><img alt="Vue logo" src="./assets/logo.png" />
        </v-avatar>
        <strong v-if="!mini" class="textLogo"> Bacon na Chapa</strong>
      </v-sheet>
      <v-divider></v-divider>

      <v-list class="menu">
        <v-list-item v-for="item in items" :key="item.title" link>
          <ul>
            <router-link :to="item.link" tag="li">
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-content v-if="!mini">
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </router-link>
          </ul>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>

    <v-footer>
      <!-- -->
    </v-footer>
  </v-app>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "App",
  data() {
    return {
      drawer: true,
      items: [
        { title: "Home", icon: "mdi-home-city", link: "/" },
        { title: "Cardápio", icon: "mdi-food", link: "/Cardapio" },
        { title: "Pedido", icon: "mdi-file", link: "/Pedido" },
      ],
      mini: false,
    };
  },
  methods: {
    ...mapMutations([
      "carregaHamburger",
      "carregaJuices",
      "carregaAdditionals",
    ]),
    obterProdutos() {
      this.$http.get('Hanburgers').then(res => {
        const {Produtos} = res.data
        this.carregaHamburger(Produtos)
      })
      this.$http.get('Juices').then(res => {
        const {Produtos} = res.data
        this.carregaJuices(Produtos)
      })
      this.$http.get('Additionals').then(res => {
        const {Produtos} = res.data
        this.carregaAdditionals(Produtos)
      })
    },
  },
  beforeMount(){
    this.obterProdutos()
  }
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Lobster&display=swap");
.app {
  background-color: #f0f0ed;
}
.menu ul {
  list-style: none;
  padding: 0;
  overflow: hidden;
}

.menu li {
  height: 50px;
  width: 100%;
  display: flex;
}

.logo {
  overflow: hidden;
  height: 90px;
}

.logo .textLogo {
  font-family: "Lobster", cursive;
  font-size: 20px;
}
</style>
