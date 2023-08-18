<script>
    import {deleteDoc, doc, setDoc } from "firebase/firestore";
    import { db } from "../firebase/config";
    import CodeEditor, { Ucss, Uhtml, Ujs, updatePreview } from "./codeEditor.svelte";
    let open = ''
    export let requests
    export let uploads
    async function approve(request){
        requests.filter(req=>!req.name.includes(request.name))
        request['upload_date'] = Date.now()
        await setDoc(doc(db, 'sites', request.name), request)
        await deleteDoc(doc(db, 'pushRequests', request.name))
        updateRequests()
    }
</script>
<p>Upload Requests: </p>
{#each requests as request}
    <p>name: {request.name}</p>
    <p>description: {request.description}</p>
    <p>password: {request.encryption?request.encryption:'none'}</p>
    {#if open==request.name}
    <button on:click={()=>approve(request)}>approve upload</button>
    <button on:click={function(){open='';}}>hide code</button>
    <CodeEditor/>
    {:else}
    <button on:click={function(){Uhtml.set(request.html);Ucss.set(request.css);Ujs.set(request.js);open=request.name;updatePreview()}}>show code</button>
    {/if}
{/each}
<p>Uploads: </p>
{#each uploads as request}
    <p>name: {request.name}</p>
    <p>description: {request.description}</p>
    <p>password: {request.pass?request.pass:''}</p>
    {#if open==request.name}
    <button on:click={()=>approve(request)}>approve upload</button>
    <button on:click={function(){open='';}}>hide code</button>
    <CodeEditor/>
    {:else}
    <button on:click={function(){Uhtml.set(request.html);Ucss.set(request.css);Ujs.set(request.js);open=request.name;updatePreview()}}>show code</button>
    {/if}
{/each}