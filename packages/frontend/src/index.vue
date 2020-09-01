<template>
    <div>
        <h1>Hello, world!</h1>
        <div class="lol" ref="cytoscape">zeazeeza</div>
    </div>
</template>

<script>
import cytoscape from "cytoscape";

export default {
    mounted() {
        const cy = cytoscape({
            container: this.$refs.cytoscape,

            elements: [
              { data: { id: 'n0', content: "lol" } },
              { data: { id: 'n1', content: "mdr" } },
              { data: { id: 'e0', source: 'n0', target: 'n1' } }
            ],

            style: [
                {
                    selector: "edge",
                    style: {
                        'target-arrow-shape': 'triangle',
                        'curve-style': 'bezier'
                    }
                },

                {
                    selector: "node",
                    style: {
                        label: 'data(content)',
                        width: "label",
                        height: "label",
                        'text-valign': 'center',
                        'text-halign': 'center',
                        'text-wrap': 'wrap',
                        shape: "rectangle"
                    }
                }
            ]
        });
    }
};
</script>

<style>
.lol {
    width: 300px;
    height: 300px;
    display: block;
}
</style>
