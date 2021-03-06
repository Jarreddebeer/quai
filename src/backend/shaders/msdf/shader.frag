#extension GL_EXT_shader_texture_lod : enable
#extension GL_OES_standard_derivatives : enable
precision mediump float;

varying vec4 vColor;
varying vec2 vUv;
uniform sampler2D uvSampler;
uniform float opacity;

float median(float r, float g, float b) {
  return max(min(r, g), min(max(r, g), b));
}

float msdfAlpha(vec2 uv) {
  vec3 sample = texture2D(uvSampler, uv).rgb;
  float sigDist = median(sample.r, sample.g, sample.b) - 0.5;
  float alpha = clamp(sigDist/fwidth(sigDist) + 0.5, 0.0, 1.0);
  return alpha;
}

void main(void) {
  float alpha = msdfAlpha(vUv);
  gl_FragColor = vec4(vColor.rgb, alpha * opacity);
}