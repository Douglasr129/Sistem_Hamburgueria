<template>
    <div>
        <v-card max-width="400" outlined>
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title class="text-h5 mb-1">
                        {{ title }}
                    </v-list-item-title>
                    <v-list-item-subtitle>
                        {{ description }}
                    </v-list-item-subtitle>
                    <v-list-item-content class="align-end">
                        <div v-for="(item,i) in cesta" :key="i">
                            <v-list-item-title class="text-h6 mb-0">
                                {{ item.name }}
                            </v-list-item-title>
                            <v-list-item-subtitle>
                                {{ item.description }}
                            </v-list-item-subtitle>
                            <span>{{ item.quantity }} X - </span> <strong>{{ item.cust | dinheiro }}</strong>
                            <v-btn v-if="(!exib)" color="error" dark x-small class="ml-5" @click="remove(item)">
                                -
                            </v-btn>
                        </div>
                        <v-divider></v-divider>
                       <strong>{{ valorTotal | dinheiro }}</strong>
                    </v-list-item-content>
                </v-list-item-content>
            </v-list-item>
            <v-card-actions v-if="((cesta.length > 0)&&(!exib))">
                <v-row>
                    <v-col class="d-flex" justify-center>
                        <v-btn color="success" dark @click="RedirectPedido()">
                            Finalizar Pedido
                        </v-btn>
                    </v-col>
                </v-row>
            </v-card-actions>
        </v-card>
    </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
    props: ["title", "description", "exib"],
    computed: {
        ...mapGetters(['valorTotal']),
/*         total(){
            return this.$store.getters.valorTotal
        }, */
        cesta() {
            return this.$store.state.Cesta
        }
    },
    methods:{
        ...mapMutations(['removeCesta']),
        remove(produto){
            this.removeCesta(produto)
        },
        RedirectPedido(){
            this.$router.push('Pedido') 
        }
        
    }
}
</script>
<style>
</style>