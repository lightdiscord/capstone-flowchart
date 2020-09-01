let
  pkgs = import <nixpkgs> { };

  capstone = pkgs.callPackage ./capstone.nix { };

in

  pkgs.mkShell {
    buildInputs = [
      pkgs.emscripten pkgs.pkgconfig capstone
    ];
  }
