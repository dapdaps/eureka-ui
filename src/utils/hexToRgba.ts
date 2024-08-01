const hexToRgba = (hex: any, opacity: number) => {
  var hexx = hex.replace('#', '0x');
  var r = hexx >> 16;
  var g = hexx >> 8 & 0xff;
  var b = hexx & 0xff;
  return `rgba(${r}, ${g}, ${b}, ${opacity ?? 1})`;
}

export default hexToRgba;