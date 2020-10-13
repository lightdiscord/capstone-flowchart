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

export default {
    props: {
        offset: Number
    },
    computed: {
        ...mapState(["sections"])
    },
    mounted() {
        console.log("lol mdr xpdr");
        // Create a new directed graph
        const g = new dagreD3.graphlib.Graph().setGraph({});

        
        //const current = this.sections[this.offset];

        //console.log(current);

        for (const current of Object.values(this.sections)) {

            g.setNode(
                current.offset,
                {
                    label: current.instructions
                        .map(({ address, mnemonic, opString }) => `${address.toString(16)}: ${mnemonic} ${opString}`)
                    .join("\n")
                }
            );

        }

        for (const current of Object.values(this.sections)) {
            if (current.next) {
                if (Array.isArray(current.next))
                {
                    const [yes, no] = current.next;

                    g.setEdge(current.offset, yes, { label: "yes" });
                    g.setEdge(current.offset, no, { label: "no" });
                }
                else
                {
                    g.setEdge(current.offset, current.next, { label: "" });
                }
            }
        }

        // // States and transitions from RFC 793
        // const states = [ "CLOSED", "LISTEN", "SYN RCVD", "SYN SENT",
        //     "ESTAB", "FINWAIT-1", "CLOSE WAIT", "FINWAIT-2",
        //     "CLOSING", "LAST-ACK", "TIME WAIT" ];

        // // Automatically label each of the nodes
        // states.forEach(function(state) { g.setNode(state, { label: state }); });

        // // Set up the edges
        // g.setEdge("CLOSED",     "LISTEN",     { label: "open" });
        // g.setEdge("LISTEN",     "SYN RCVD",   { label: "rcv SYN" });
        // g.setEdge("LISTEN",     "SYN SENT",   { label: "send" });
        // g.setEdge("LISTEN",     "CLOSED",     { label: "close" });
        // g.setEdge("SYN RCVD",   "FINWAIT-1",  { label: "close" });
        // g.setEdge("SYN RCVD",   "ESTAB",      { label: "rcv ACK of SYN" });
        // g.setEdge("SYN SENT",   "SYN RCVD",   { label: "rcv SYN" });
        // g.setEdge("SYN SENT",   "ESTAB",      { label: "rcv SYN, ACK" });
        // g.setEdge("SYN SENT",   "CLOSED",     { label: "close" });
        // g.setEdge("ESTAB",      "FINWAIT-1",  { label: "close" });
        // g.setEdge("ESTAB",      "CLOSE WAIT", { label: "rcv FIN" });
        // g.setEdge("FINWAIT-1",  "FINWAIT-2",  { label: "rcv ACK of FIN" });
        // g.setEdge("FINWAIT-1",  "CLOSING",    { label: "rcv FIN" });
        // g.setEdge("CLOSE WAIT", "LAST-ACK",   { label: "close" });
        // g.setEdge("FINWAIT-2",  "TIME WAIT",  { label: "rcv FIN" });
        // g.setEdge("CLOSING",    "TIME WAIT",  { label: "rcv ACK of FIN" });
        // g.setEdge("LAST-ACK",   "CLOSED",     { label: "rcv ACK of FIN" });
        // g.setEdge("TIME WAIT",  "CLOSED",     { label: "timeout=2MSL" });

        // Set some general styles
        // g.nodes().forEach(function(v) {
        //     var node = g.node(v);
        //     node.rx = node.ry = 5;
        // });

        // // Add some custom colors based on state
        // g.node('CLOSED').style = "fill: #f77";
        // g.node('ESTAB').style = "fill: #7f7";

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
