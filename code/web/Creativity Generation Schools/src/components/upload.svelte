<script>
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
let submitting=false, name='', description='', sendMsg='', sent = false, execmsg='', newPass
import CodeEditor from "./codeEditor.svelte";
import { db } from "../firebase/config";
import { userData } from "../firebase/user-management";
import {HTML, CSS, JS} from './codeEditor.svelte'
import {bcrypt} from 'hash-wasm'
    import { get } from "svelte/store";
async function sendReq(){
sendMsg = 'Sending...'
let sendDoc = doc(db, `${$userData.role.admin?'sites':'pushRequests'}`, name)
if((await getDoc(sendDoc)).exists()||(await getDoc(doc(db, 'sites', name))).exists()) return sendMsg='Name unavailable choose a different one'
let uploadData = {name:name, description:description, sender:$userData.username, html:get(HTML), css:get(CSS), js:get(JS), type:'upload', views:0}
if(newPass.length > 0){
    const salt = new Uint8Array(16);
    window.crypto.getRandomValues(salt);
    let encryption = await bcrypt({ password: newPass, salt, costFactor: 11, outputType: 'encoded'});
    console.log(encryption)
    uploadData['encryption'] = encryption
    uploadData['pass']=newPass
}
await setDoc(sendDoc, uploadData)
$userData.uploads.push(name) 
await updateDoc(doc(db, 'userdata', $userData.username), {
    data:$userData
})
sendMsg = `${$userData.role.admin?`Published successfully! link: ${window.location.origin}/pages/${name}`:'Sent! waiting for admin to accept...'}`
sent = true
}
</script>
{#if sent}
<p>{sendMsg}</p>
{:else}
{#if submitting}
<button on:click={()=>submitting=false}>back</button><br><br>
<input type="text" bind:value={name} maxlength="15" placeholder="Name" minlength="1"> <br><br>
<textarea cols="50" rows="8" maxlength="300" bind:value={description} placeholder="Description" minlength="20"></textarea><br><br>
<input type="text" placeholder="set password. (optional)" bind:value={newPass}><br><br>
<button on:click={sendReq}>Send request</button>
<p>{sendMsg}</p>
{:else}
{#if execmsg != ''}
<p>{execmsg}</p>
{/if}
<CodeEditor/>
<button on:click={function(){submitting=true}} class="upload">Upload</button>
{/if}
<style>
</style>
{/if}
<style>
    .upload{
        width: 100%;
        text-align: center;
        background: transparent;
    }
</style>