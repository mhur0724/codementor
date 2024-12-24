import * as THREE from "three";
import getQueryParameter from "./getQueryParameter";
export default function updateCubeColor() {
  const color = getQueryParameter("color");
  if (color && (/^#[0-9A-F]{6}$/i.test(color) || THREE.Color.NAMES[color])) {
    cubeMaterial.color.set(color);
  }
}
