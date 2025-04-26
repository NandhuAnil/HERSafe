export const adjustColor = (color: string, amount: number) => {
    let usePound = false;
  
    if (color[0] === '#') {
      color = color.slice(1);
      usePound = true;
    }
  
    let num = parseInt(color, 16);
  
    let r = (num >> 16) + amount;
    let g = ((num >> 8) & 0x00ff) + amount;
    let b = (num & 0x0000ff) + amount;
  
    r = Math.min(255, Math.max(0, r));
    g = Math.min(255, Math.max(0, g));
    b = Math.min(255, Math.max(0, b));
  
    return (usePound ? '#' : '') + ((r << 16) | (g << 8) | b).toString(16).padStart(6, '0');
  };
  