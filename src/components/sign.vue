<script setup lang="ts">
import { onMounted, ref, } from 'vue'

import {MetamaskSign} from '../lib/metamask'


const sig = ref('')
const accountAdress = ref('')
onMounted(() => {
  if(!MetamaskSign.isMetamaskInstalled())(
    alert('Please open with Metamask')
  )
  if(!MetamaskSign.isMetamaskLocked()){
    // connect wallet
    window.ethereum.request({ method: 'eth_requestAccounts' })
    .then(()=>{
        // get signer address
        return MetamaskSign.getSigner().getAddress()
    }).then((address:string)=>{
        accountAdress.value = address;
    })
  }
})

const sign = async ()=>{
  const s = await MetamaskSign.sign('app metamask sign test');
  sig.value = `${accountAdress}:${s}`;
  window.open(`https://www.0xleung.com/authed/${s}`, '_blank')
}
</script>

<template>

<p>{{sig}}</p>

  <button type="button" @click="sign">sign</button>

</template>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
