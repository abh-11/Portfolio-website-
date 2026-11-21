// Original pen studies for the journal's chapter dividers.
type Subject = "sprig" | "book" | "butterfly";

function Sprig() {
  const leaves = [
    [51,103,-63,.76], [54,95,25,1], [66,78,-60,.95], [70,70,27,.94],
    [83,52,-48,.8], [89,43,30,.77], [100,29,2,.67],
  ];
  return <>
    <path d="M37 132C56 90 77 59 104 20M40 131C63 83 83 51 102 22" />
    {leaves.map(([x,y,r,s]) => <g key={y} transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
      <path d="M0 0C-5-18 0-35 8-45C13-31 14-13 0 0Z M0 0Q5-22 8-43" />
      {[0,1,2,3,4,5].map(i => <path key={i} d={`M${.8+i*.97} ${-4-i*5.7}l${-3.6+i*.23} -6m${3.6-i*.23} 6l${6.3-i*.58} -5.8`} strokeWidth=".65"/>)}
    </g>)}
  </>;
}

function Book() {
  return <g transform="translate(2 0) rotate(-11 76 80)">
    <path d="m17 53 8 62q33-9 53 6 20-14 54-9l-5-66q-32-7-52 9-24-14-58-8z" />
    <path d="m20 48 8 62q30-8 50 8 21-16 50-11l-6-65q-31-4-48 11-25-16-54-5z" />
    <path d="m24 44 7 61q29-5 47 11l-4-64q-18-15-50-8z M74 52q20-18 46-16l5 67q-26-3-47 13" />
    {Array.from({length:9},(_,i)=><g key={i} strokeWidth=".7">
      <path d={`M${29+i*.5} ${50+i*5.6}q21-3 38 7M${80+i*.35} ${54+i*5.5}q14-10 34-11`}/>
    </g>)}
    <path d="m98 41 9-2 3 30-5-3-5 6z" fill="var(--chapter-fill)"/>
    <path d="m24 116 54 8 56-10 M29 120l48 7 49-10"/>
  </g>;
}

function Butterfly() {
  return <g transform="translate(7 10) rotate(-16 70 65)">
    <path d="M69 68C51 35 24 7 9 13 0 17 8 39 15 53 24 67 45 76 64 78 44 70 25 72 27 87 28 101 46 115 57 107 66 101 69 87 70 77M71 66C84 29 113 7 128 10 139 15 127 45 121 54 109 69 90 73 76 77 97 66 117 68 115 85 113 104 94 111 84 103 77 96 74 85 73 77"/>
    <path d="M70 64Q53 35 18 19c-9-1-1 18 4 27q14 18 41 28m-45-55q25 30 51 50M70 65q17-34 54-48c6 3-3 21-8 31-13 13-26 20-40 24m47-55Q108 45 74 69"/>
    {[0,1,2,3,4].map(i=><g key={i} strokeWidth=".95">
      <path d={`M65 74Q${36-i*2} ${50+i*5} ${14+i*2} ${30+i*5} M75 73Q100 ${48+i*6} ${126-i*2.7} ${27+i*6} M65 78Q${42+i} 84 ${33+i*5.5} ${82+i*4.6}M77 78Q97 83 ${110-i*4.5} ${79+i*5.7}`}/>
    </g>)}
    <path d="M69 57q3-4 5 0l-1 31q-2 9-4 0zm2-1q-9-25-15-22m16 20q4-23 11-25" />
  </g>;
}

export default function Specimen({ subject }: { subject: Subject }) {
  return <svg className="specimen" viewBox="0 0 145 140" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" strokeLinecap="round" aria-hidden="true">
    {subject === "sprig" ? <Sprig/> : subject === "book" ? <Book/> : <Butterfly/>}
  </svg>;
}
