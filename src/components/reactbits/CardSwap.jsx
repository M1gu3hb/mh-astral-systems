import React, {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';
import gsap from 'gsap';
import './CardSwap.css';

// React Bits — CardSwap. Adapted (docs/10): recolored to brand via CSS, and
// extended with an imperative `goTo(index)` + `onIndexChange` so the deck can be
// driven by the service legend buttons (click an icon/card → that card animates
// to the front). Core swap animation is unchanged.
export const Card = forwardRef(({ customClass, ...rest }, ref) => (
  <div ref={ref} {...rest} className={`card ${customClass ?? ''} ${rest.className ?? ''}`.trim()} />
));
Card.displayName = 'Card';

const makeSlot = (i, distX, distY, total) => ({
  x: i * distX,
  y: -i * distY,
  z: -i * distX * 1.5,
  zIndex: total - i,
});
const placeNow = (el, slot, skew) =>
  gsap.set(el, {
    x: slot.x,
    y: slot.y,
    z: slot.z,
    xPercent: -50,
    yPercent: -50,
    skewY: skew,
    transformOrigin: 'center center',
    zIndex: slot.zIndex,
    force3D: true,
  });

const CardSwap = forwardRef(function CardSwap(
  {
    width = 500,
    height = 400,
    cardDistance = 60,
    verticalDistance = 70,
    delay = 5000,
    pauseOnHover = false,
    onCardClick,
    onIndexChange,
    skewAmount = 6,
    easing = 'elastic',
    children,
  },
  apiRef,
) {
  const config =
    easing === 'elastic'
      ? {
          ease: 'elastic.out(0.6,0.9)',
          durDrop: 2,
          durMove: 2,
          durReturn: 2,
          promoteOverlap: 0.9,
          returnDelay: 0.05,
        }
      : {
          ease: 'power1.inOut',
          durDrop: 0.8,
          durMove: 0.8,
          durReturn: 0.8,
          promoteOverlap: 0.45,
          returnDelay: 0.2,
        };

  const childArr = useMemo(() => Children.toArray(children), [children]);
  const refs = useMemo(
    () => childArr.map(() => React.createRef()),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [childArr.length],
  );

  const order = useRef(Array.from({ length: childArr.length }, (_, i) => i));

  const tlRef = useRef(null);
  const intervalRef = useRef();
  const timeoutRef = useRef();
  const container = useRef(null);
  const swapRef = useRef(() => {});
  const onIndexChangeRef = useRef(onIndexChange);
  onIndexChangeRef.current = onIndexChange;

  // How long a hand-picked card sits at the front before auto-cycling resumes.
  const POST_SELECT_DWELL = 2000;
  // Snappy "pop to front" timing for taps (the auto elastic swap is slower).
  const NAV = { durDrop: 0.5, durMove: 0.6, durReturn: 0.55, promoteOverlap: 0.7, returnDelay: 0.1, ease: 'power3.out' };

  const resumeAfterDwell = () => {
    clearTimeout(timeoutRef.current);
    clearInterval(intervalRef.current);
    timeoutRef.current = window.setTimeout(() => {
      intervalRef.current = window.setInterval(() => swapRef.current(), delay);
    }, POST_SELECT_DWELL);
  };

  // Imperative jump: bring `index` to the front using the SAME drop-and-settle
  // motion the deck uses — the chosen card lifts out and lands on top while the
  // rest shift back one slot (instead of sliding straight through the stack).
  useImperativeHandle(apiRef, () => ({
    goTo(index) {
      clearTimeout(timeoutRef.current);
      clearInterval(intervalRef.current);
      tlRef.current?.kill();

      const total = refs.length;
      if (order.current[0] === index) {
        resumeAfterDwell();
        return;
      }

      const rest = order.current.filter((i) => i !== index);
      order.current = [index, ...rest];
      onIndexChangeRef.current?.(index);

      const elSel = refs[index].current;
      const tl = gsap.timeline();
      tlRef.current = tl;

      // 1) pop the chosen card out toward the viewer
      tl.set(elSel, { zIndex: total + 2 });
      tl.to(elSel, { y: '+=500', duration: NAV.durDrop, ease: NAV.ease });

      // 2) slide the rest back one slot (1..n) as it lifts
      tl.addLabel('promote', `-=${NAV.durDrop * NAV.promoteOverlap}`);
      rest.forEach((idx, i) => {
        const el = refs[idx].current;
        const slot = makeSlot(i + 1, cardDistance, verticalDistance, total);
        tl.set(el, { zIndex: slot.zIndex }, 'promote');
        tl.to(el, { x: slot.x, y: slot.y, z: slot.z, duration: NAV.durMove, ease: NAV.ease }, `promote+=${i * 0.05}`);
      });

      // 3) settle the chosen card into the front slot
      const front = makeSlot(0, cardDistance, verticalDistance, total);
      tl.addLabel('return', `promote+=${NAV.durMove * NAV.returnDelay}`);
      tl.set(elSel, { zIndex: front.zIndex }, 'return');
      tl.to(elSel, { x: front.x, y: front.y, z: front.z, duration: NAV.durReturn, ease: 'back.out(1.3)' }, 'return');

      // 4) hold briefly, then resume auto-cycling
      tl.call(resumeAfterDwell);
    },
  }));

  useEffect(() => {
    const total = refs.length;
    refs.forEach((r, i) => placeNow(r.current, makeSlot(i, cardDistance, verticalDistance, total), skewAmount));

    const swap = () => {
      if (order.current.length < 2) return;

      const [front, ...rest] = order.current;
      const elFront = refs[front].current;
      const tl = gsap.timeline();
      tlRef.current = tl;

      tl.to(elFront, {
        y: '+=500',
        duration: config.durDrop,
        ease: config.ease,
      });

      tl.addLabel('promote', `-=${config.durDrop * config.promoteOverlap}`);
      rest.forEach((idx, i) => {
        const el = refs[idx].current;
        const slot = makeSlot(i, cardDistance, verticalDistance, refs.length);
        tl.set(el, { zIndex: slot.zIndex }, 'promote');
        tl.to(
          el,
          {
            x: slot.x,
            y: slot.y,
            z: slot.z,
            duration: config.durMove,
            ease: config.ease,
          },
          `promote+=${i * 0.15}`,
        );
      });

      const backSlot = makeSlot(refs.length - 1, cardDistance, verticalDistance, refs.length);
      tl.addLabel('return', `promote+=${config.durMove * config.returnDelay}`);
      tl.call(
        () => {
          gsap.set(elFront, { zIndex: backSlot.zIndex });
        },
        undefined,
        'return',
      );
      tl.to(
        elFront,
        {
          x: backSlot.x,
          y: backSlot.y,
          z: backSlot.z,
          duration: config.durReturn,
          ease: config.ease,
        },
        'return',
      );

      tl.call(() => {
        order.current = [...rest, front];
        onIndexChangeRef.current?.(order.current[0]);
      });
    };

    swapRef.current = swap;
    swap();
    intervalRef.current = window.setInterval(swap, delay);

    if (pauseOnHover) {
      const node = container.current;
      const pause = () => {
        tlRef.current?.pause();
        clearTimeout(timeoutRef.current);
        clearInterval(intervalRef.current);
      };
      const resume = () => {
        tlRef.current?.play();
        clearTimeout(timeoutRef.current);
        clearInterval(intervalRef.current);
        intervalRef.current = window.setInterval(swap, delay);
      };
      node.addEventListener('mouseenter', pause);
      node.addEventListener('mouseleave', resume);
      return () => {
        node.removeEventListener('mouseenter', pause);
        node.removeEventListener('mouseleave', resume);
        clearTimeout(timeoutRef.current);
        clearInterval(intervalRef.current);
      };
    }
    return () => {
      clearTimeout(timeoutRef.current);
      clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardDistance, verticalDistance, delay, pauseOnHover, skewAmount, easing]);

  const rendered = childArr.map((child, i) =>
    isValidElement(child)
      ? cloneElement(child, {
          key: i,
          ref: refs[i],
          style: { width, height, ...(child.props.style ?? {}) },
          onClick: (e) => {
            child.props.onClick?.(e);
            onCardClick?.(i);
          },
        })
      : child,
  );

  return (
    <div ref={container} className="card-swap-container" style={{ width, height }}>
      {rendered}
    </div>
  );
});

export default CardSwap;
