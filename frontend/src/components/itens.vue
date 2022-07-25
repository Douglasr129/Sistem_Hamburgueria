<template lang="">
        
    <v-card max-width="400" height="180px" :color="color" outlined>
        <v-row class="m-0 p-0">
            <v-col class="m-0 p-0"> 
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title class="text-h6 mb-0">
                            {{produto.id}}---{{produto.name}}
                        </v-list-item-title>
                        <v-list-item-subtitle>
                            {{produto.description}}
                        </v-list-item-subtitle>
                        <v-list-item-content class="align-end">
                           <strong>{{ produto.cust | dinheiro}}</strong>
                        </v-list-item-content>
                        <v-row>
                            <v-col>
                                <v-list-item-content class="align-end m-0">
                                    <v-text-field v-model.number="amount" width="30px" type="number" class="m-0">
                                        <v-icon slot="append" color="red" @click="plus()">
                                            mdi-plus
                                        </v-icon>
                                        <v-icon slot="prepend" color="green" @click="minus()">
                                            mdi-minus
                                        </v-icon>
                                    </v-text-field>
                                </v-list-item-content>  
                            </v-col>
                            <v-col>
                                <v-list-item-content class="align-end m-0">
                                  <v-btn color="success" @click="add()" width="15px"
                                    class="mx-2 w-1">
                                         add
                                    </v-btn>
                                </v-list-item-content>
                            </v-col>
                        </v-row> 
                    </v-list-item-content>
                </v-list-item>                                         
            </v-col>
        </v-row> 
    </v-card>
</template>
<script>
import { mapMutations } from 'vuex';
export default {
    props: ["produto", "color"],
    data() {
        return { amount: 0 };
    },
    computed: {

    },
    methods: {
        ...mapMutations(['addCesta']),
        plus() {
            this.amount++;
        },
        minus() {
            if (this.amount > 0) this.amount--;
        },
        add() {
            this.produto.quantity = this.amount
            if(this.produto.quantity>0)
                 this.addCesta(this.produto)
        }
    },
};
</script>
<style>
.addItens input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
</style>