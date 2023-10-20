let xDown: number | null = null;
let yDown: number | null = null;

function getTouches(evt: React.TouchEvent) {
  return evt.touches;
}

export function handleTouchStart(evt: React.TouchEvent) {
  const firstTouch = getTouches(evt)[0];
  xDown = firstTouch.clientX;
  yDown = firstTouch.clientY;
}

export function handleTouchMove(
  evt: React.TouchEvent,
  rightSwipe: () => void,
  leftSwipe: () => void
) {
  if (!xDown || !yDown) {
    yDown = null;
    xDown = null;
    return;
  }

  let xUp = evt.touches[0].clientX;
  let yUp = evt.touches[0].clientY;

  let xDiff = xDown - xUp;
  let yDiff = yDown - yUp;

  if (Math.abs(xDiff) > Math.abs(yDiff)) {
    /*most significant*/
    if (xDiff > 0) {
      /* right swipe */
      // console.log('right')
      rightSwipe();
    } else {
      /* left swipe */
      // console.log('left')
      leftSwipe();
    }
  }
  xDown = null;
  yDown = null;
}
