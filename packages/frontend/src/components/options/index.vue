<template>
    <div class="section">
        <div class="container">
            <h2 class="title">Configuration</h2>
            <p class="subtitle">Choose an arch, a mode, an offset and specify the program bytes to generate a flowchart</p>
            <form>
                <div class="field">
                    <label class="label" for="arch">Arch</label>
                    <div class="control">
                        <div class="select">
                            <select v-model="arch" id="arch">
                                <option :value="3">CS_ARCH_X86</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div class="field">
                    <label class="label" for="mode">Mode</label>
                    <div class="control">
                        <div class="select">
                            <select v-model="mode" id="mode">
                                <option :value="(1 << 2)">CS_MODE_32</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div class="field">
                    <label class="label" for="offset">Offset</label>
                    <div class="control">
                        <input class="input is-danger" id="offset" type="text" v-model="offset"></input>
                    </div>
                    <p class="help is-danger">This offset is not valid, it must be a positive integer</p>
                </div>

                <div class="field">
                    <label class="label" for="bytes">Bytes</label>
                    <div class="control">
                        <textarea class="textarea" id="bytes" v-model="bytes"></textarea>
                    </div>
                    <p class="help">It must be an hexadecimal string, every non hexadecimal characters are ignored</p>
                </div>

                <div class="field">
                    <div class="control">
                        <button class="button is-link">Submit</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    data: () => ({
        arch: 3,
        mode: (1 << 2),
        offset: 0,
        bytes: ""
    })
}
</script>
