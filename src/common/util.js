
import * as R from "ramda";
export function isImage(fileName) {
  const suffixImg = /.*\.(bmp|jpg|png|tif|gif|pcx|tga|exif|fpx|svg|psd|cdr|pcd|dxf|ufo|eps|ai|raw|WMF|webp|jpeg)/;
  return suffixImg.test(fileName ? fileName.toLowerCase() : "") || R.startsWith("data:image", name);
}
export function isVideo(fileName) {
  const suffixVideo = /.*\.(flv|mp4|avi|wmv|mpg|mov|mkv|f4v|m4v|rmvb|rm|3gp)/;
  return suffixVideo.test(fileName ? fileName.toLowerCase() : "");
}
