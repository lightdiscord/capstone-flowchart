{ buildEmscriptenPackage, fetchFromGitHub }:

buildEmscriptenPackage rec {
    pname = "capstone";
    version = "4.0.2";

    src = fetchFromGitHub {
        owner = "aquynh";
        repo = pname;
        rev = version;
        sha256 = "0y5g74yjyliciawpn16zhdwya7bd3d7b1cccpcccc2wg8vni1k2w";
    };

    dontConfigure = true;

    buildPhase = ''
        runHook preBuild

        HOME=$TMPDIR

        echo $out
        emmake make PREFIX=$out -j''${NIX_BUILD_CORES} -l''${NIX_BUILD_CORES} all

        runHook postBuild
    '';

    checkPhase = ''
        # TODO: Write a check phase to ensure that required symbols are defined
    '';

    makeFlags = [ "PREFIX=$(out)" ];
}
