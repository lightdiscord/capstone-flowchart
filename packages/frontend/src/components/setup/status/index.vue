<template>
    <div class="section">
        <div class="container">
            <h2 class="title">Setup status</h2>
            <p class="subtitle">Status of the worker running the capstone engine.</p>
            <aside class="menu">
                <p class="menu-label">Worker</p>
                <ul class="menu-list">
                    <li><a class="is-active">Launch and connect to the worker</a></li>
                </ul>
                <p class="menu-label">Capstone</p>
                <ul class="menu-list">
                    <li><a>Download and instantiate the wasm module</a></li>
                    <li><a>Wait for runtime initialization</a></li>
                </ul>
            </aside>
        </div>
    </div>
</template>

<script>
import * as capstone from "@capstone-flowchart/capstone-engine";

export default {

}
</script>
