let
  pkgs = import <nixpkgs> { };

  capstone = pkgs.callPackage ./capstone.nix { };

in

  pkgs.mkShell {
    buildInputs = [
      pkgs.emscripten capstone pkgs.pkgconfig
    ];

    EM_CACHE = "/tmp/.csf-cache";
  }
