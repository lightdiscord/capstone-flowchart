<template>
    <div>
        <h1 class="title">Graph</h1>
        <svg width=960 height=600 ref="svg"><g/></svg>
    </div>
</template>

<script>
import { mapState } from "vuex";

import * as d3 from "d3";
import dagreD3 from "dagre-d3";

const addSection = (graph, sections) => (offset) => {
    if (graph.node(offset)) return;

    const section = sections[offset];
    const label = section.instructions
        .map(({ address, mnemonic, opString }) => `${address.toString(16)}: ${mnemonic} ${opString}`)
        .join("\n");

    graph.setNode(offset, { label });

    if (section.next) {
        if (Array.isArray(section.next)) {
            const [yes, no] = section.next;

            graph.setEdge(offset, yes, {
                label: "",
                style: "stroke: #0f0; fill: transparent",
                arrowheadStyle: "fill: #0f0; stroke: #0f0"
            });
            graph.setEdge(offset, no, {
                label: "",
                style: "stroke: #f00; fill: transparent",
                arrowheadStyle: "fill: #f00; stroke: #f00"
            });
            addSection(graph, sections)(yes);
            addSection(graph, sections)(no);
        } else {
            graph.setEdge(offset, section.next, { label: "" });
            addSection(graph, sections)(section.next);
        }
    }
};

export default {
    props: {
        offset: Number
    },
    computed: {
        ...mapState(["sections"])
    },
    mounted() {
        console.log("lol mdrxpdr");
        // Create a new directed graph
        const g = new dagreD3.graphlib.Graph().setGraph({});

        console.log(this.sections);
        if (this.sections && this.sections[this.offset]) {
            addSection(g, this.sections)(this.offset);
        }

        const svg = d3.select(this.$refs.svg),
            inner = svg.select("g");

        // Set up zoom support
        const zoom = d3.zoom().on("zoom", function(event) {
            inner.attr("transform", event.transform);
        });
        svg.call(zoom);

        // Create the renderer
        const render = new dagreD3.render();

        // Run the renderer. This is what draws the final graph.
        render(inner, g);

        // Center the graph
        const initialScale = 0.75;
        svg.call(zoom.transform, d3.zoomIdentity.translate((svg.attr("width") - g.graph().width * initialScale) / 2, 20).scale(initialScale));

        svg.attr('height', g.graph().height * initialScale + 40);
    }
}
</script>

<style lang="sass">
.node rect {
  stroke: #333;
  fill: #fff;
}

.edgePath path {
  stroke: #333;
  fill: #333;
  stroke-width: 1.5px;
}
</style>
