const { useMemo, useRef, useState } = React;
const h = React.createElement;

const MODES = [
  { id: 1, title: "استخراج نسبة", hint: "كم يساوي 15% من 500؟", icon: "%", tone: "violet" },
  { id: 2, title: "كم نسبته؟", hint: "75 من 300 تساوي كم؟", icon: "÷", tone: "blue" },
  { id: 3, title: "زيادة بنسبة", hint: "أضف 10% على 5000", icon: "+", tone: "green" },
  { id: 4, title: "خصم بنسبة", hint: "اخصم 20% من 800