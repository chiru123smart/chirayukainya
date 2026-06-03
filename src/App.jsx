import { useState, useEffect, useRef } from "react";

const NAVY="#0f1923",NAVY2="#162231",NAVY3="#1c2d3f",ACCENT="#1a3c5e",BLUE="#2b6cb0",GOLD="#d4a853",TEXT="#e2e8f0",DIM="#94a3b8";
const GEMINI_KEY=import.meta.env.VITE_GEMINI_KEY||"";
const CALENDLY_URL="https://calendly.com/chirayu-kainya";

const chatContext=`You are Chirayu Kainya's AI assistant on his personal website. Be conversational, warm, concise.

ABOUT CHIRAYU:
Product Manager at Fynd (Reliance Retail) with 8+ years experience. AI-Native Business Leader & Data-Driven Retail Strategist.

PERSONALITY: Proactive builder who automates before being asked. Operates above his title. Doesn't escalate — solves. Learns on the ground visiting stores weekly. Colleagues say "he leaves no stones unturned." Deeply technical (SSH into databases, debug pipelines, write Python) but also strategic (presents to leadership, manages vendors, aligns 4+ cross-functional teams).

CAREER:
1. Infosys, Bangalore (2017-19): Data Science. UPS (driver churn prediction, bid optimization), Starbucks (reporting). Route optimization using Clark-Wright & genetic algorithms.
2. Myntra, Bangalore (2019-21): Warehouse optimization. Orphan Inventory Resolution — recovered ~2M items worth ~$25M+. Won "Make It Happen" Award. Reduced pilferage 4%, bad quality 40%.
3. Flipkart, Bangalore (2021): Internal move. Basket size optimization, shipment analysis.
4. Fynd/Reliance Retail, Mumbai (2021-Present):
   - JioMart Data Analyst (2021-22): Debugging tools saving 3-4hrs/day, automated 15K financial entries in 3 days, dashboards for leadership, 1.5x productivity.
   - ACL TPM (2023): Address Engine (25% fewer failed deliveries), Demand Forecasting (90%+ accuracy), Retail Assortment Engine. Annual Award + Crackathon Top 8.
   - Impetus PM (2024-25): 250GB daily pipeline in 2 days, planograms 3hrs to 15min, support 3/wk to 300/day with AI chatbot, CCTV customer analytics.
   - Store to Shelf PM (2025-Now): Co-created VM & Space Planning from scratch. Digital Twin of 2,000+ stores. RFID fixture-to-product compliance. Computer vision automated audits. Agentic Space Planning. 22-skill AI PM system. 4 retail formats. Platform = "Phase 0" for ~$12M/day revenue target.

TEAM: Led 4 Data Analysts (managed alone when 3 left). Hired BPMs & DAs. Trained 900+ users. Guided 7 indirect reports. Built 35+ doc knowledge base.

OPEN TO: Opportunities, partnerships, advisory, mentoring — where AI meets physical operations.
CONTACT: chirayu.v.kainya@gmail.com | linkedin.com/in/chirayukainya
BOOK A CALL: When someone wants to book time, schedule a call, or meet with Chirayu, include the exact text [BOOK_NOW] in your response. This will render a booking button. Do NOT include the calendly URL — just say something like "Sure! Click below to pick a time:" followed by [BOOK_NOW] on its own line.`;

const timeline=[
  {
    id:"era-2025",
    year:"2025–Now", company:"Fynd (Reliance Retail)", role:"Product Manager", location:"Mumbai",
    color:GOLD, summary:"Digital transformation of 2,000+ retail stores — Digital Twins, AI agents, RFID, computer vision audits across 4 formats",
    projects:[
      {title:"Digital Twin for Retail Stores",desc:"Complete digital replica of physical stores — real-time inventory, processes, and 3D visualization. Every fixture has a unique digital ID with RFID-enabled product-level compliance.",details:["Live stock data + store processes + 3D floor plans in one platform","RFID fixture-to-product compliance tracking","Fixture serialization: unique IDs across all stores","3-tier approval workflow keeping digital & physical in sync","RFID tagging shifted to DCs: 1 piece/min → 30 pieces/min"],impact:"Live across 2,000+ stores in 4 retail formats"},
      {title:"Agentic Space Planning",desc:"AI agent that ingests sales, stock, and category data — then scans competitors on Google to recommend store layout changes for better visibility and conversion.",details:["Recommends eye-level placement, floor space allocation, color stories","Toy stores: child eye-height and age-group clustering","Fashion: auto-generated daily color stories from live stock","Autonomous competitor analysis via Google scanning"],impact:"Replaced 80%+ of manual Visual Merchandising effort"},
      {title:"Visual Merchandising Automation",desc:"Co-created a complete VM product from scratch with an external vendor. 5 placement strategies, automated guidelines, best-seller reporting.",details:["4 retail formats: fashion (1,600 stores), toys, lifestyle, grocery","Planogram creation: 3 hours → 15 minutes per store","Image pipeline: 51,000+ products, 92% accuracy","~2,000 stores onboarded in 2 months"],impact:"Platform designated 'Phase 0' — foundation for all downstream systems"},
      {title:"Automated Store Audits",desc:"Computer vision compares fixture photos against planograms to flag deviations. Combined with RFID for product-level compliance without human intervention.",details:["Staff photograph fixtures; system auto-flags misplacements","RFID provides product-level verification","Replaces manual area-manager visits"],impact:"End-to-end compliance across 1,600+ stores without manual audits"},
      {title:"AI-Powered PM System",desc:"Self-initiated. 22-skill AI system automating the entire PM lifecycle — Slack action items → Jira tickets → risk detection → automated standups.",details:["Sprint planning: 1 hour → 15 minutes","Task creation: 10 min → 2 min, zero duplicates","8-dimension risk engine flags issues proactively","Automated standups, release notes, retrospectives"],impact:"One PM managing 3 parallel tracks across vendor, data team, and 1,600+ stores"},
    ]
  },
  {
    id:"era-2024",
    year:"2024–25", company:"Fynd (Reliance Retail)", role:"Product Manager", location:"Mumbai",
    color:"#8b5cf6", summary:"Data infrastructure, dynamic planograms, support digitization, and in-store customer behavior analytics",
    projects:[
      {title:"Support Platform Digitization",desc:"Transformed email/call-based support into a structured digital platform with AI chatbot — built the entire system in 3 days.",details:["3-4 tickets/week → 300 tickets/day","AI Co-Pilot chatbot for instant resolution","Resolution time: 7 days → 3 days","Support costs reduced 80%","Trained 900+ users"],impact:"Completely replaced manual support with scalable AI-augmented platform"},
      {title:"Customer Behavior Analytics",desc:"CCTV-based analytics tracking dwell time, zone engagement, and movement patterns to inform store layout decisions.",details:["Partnered with AI companies for CCTV footage analysis","Tracked which zones attract attention vs ignored","Insights informed product placement and promotions"],impact:"First time this level of in-store customer insight existed"},
      {title:"Real-time Data Pipeline",desc:"250GB daily data pipeline built in 2 days — connecting planning, inventory, and store systems with automated alerts.",details:["Connected planning tools, inventory, and store platforms","Built-in alerts for missing files","Extended across multiple platforms","Proved superior to existing file-transfer methods"],impact:"250GB flowing daily; became backbone for all critical integrations"},
    ]
  },
  {
    id:"era-2023",
    year:"2023", company:"Fynd (Reliance Retail)", role:"Technical Program Manager", location:"Mumbai",
    color:"#3b82f6", summary:"Address intelligence, demand forecasting with 90%+ accuracy, and retail assortment optimization",
    projects:[
      {title:"Address Intelligence System",desc:"Converts messy Indian addresses into clean, geocoded data — with unique market features like fraud-prone location detection.",details:["Tokenizes addresses into structured components","Google Places API + fuzzy matching for cleaning","Unique: residential/commercial flags, fraud detection","Researched via Gartner reports and tech exhibitions"],impact:"Reduced failed deliveries by 25% — recognized as unique-in-market"},
      {title:"Demand Forecasting Engine",desc:"90%+ accuracy forecasting for a pharma e-commerce platform. Pricing optimization PoC increased margins by 2%.",details:["Time-series model with seasonality, trends, external events","Collaborated with partner CTO for data access","Pricing PoC validated on real inventory"],impact:"90%+ accuracy; 2% margin improvement validated"},
      {title:"Retail Assortment Optimization",desc:"Automated how stores decide which products to stock — replacing manual spreadsheet planning with instant results.",details:["Automated optimal SKU quantity calculations","Identified top 20% products driving 80% revenue","Built UI for experimentation"],impact:"Hours of manual work reduced to seconds for analysts"},
    ]
  },
  {
    id:"era-2021-22",
    year:"2021–22", company:"Fynd (Reliance Retail)", role:"Data Analyst", location:"Mumbai",
    color:"#10b981", summary:"Built automation tools and leadership dashboards — increased team productivity 1.5x",
    projects:[
      {title:"Operational Automation Suite",desc:"Multi-database debugging tools, financial entry automation, smart schedulers, and consolidated business dashboards.",details:["Debugging tool saving 15 min per case for engineers","Financial automation: 15,000 entries in 3 days (projected 3 months)","Smart Python scheduler saving 2+ hrs/day/person","KPI dashboards used by leadership for decisions"],impact:"Team productivity 1.5x; saved 3-4 hours per engineer daily"},
    ]
  },
  {
    id:"era-2021",
    year:"2021", company:"Flipkart", role:"Assistant Manager", location:"Bangalore",
    color:"#f59e0b", summary:"Shipment pattern analysis and basket size optimization for delivery efficiency",
    projects:[
      {title:"Shipment & Basket Optimization",desc:"Analyzed excess shipments from inventory mirroring. Built tools measuring offer impact on volume and revenue. Optimized units-per-shipment logic.",details:["Root cause analysis of excess shipment patterns","Tool measuring portal offer impact","Cross-docking and units-per-shipment optimization"],impact:"Improved items per order through data-driven shipment logic"},
    ]
  },
  {
    id:"era-2019",
    year:"2019–21", company:"Myntra (Flipkart Group)", role:"Data Analyst", location:"Bangalore",
    color:"#ec4899", summary:"Recovered ~$25M+ in orphan inventory, reduced pilferage and bad quality inventory",
    projects:[
      {title:"Inventory Recovery at Scale",desc:"Millions of warehouse products lost their tags. Built a system matching 'orphan' items to their identities using product attributes — making them sellable again.",details:["Matched by brand, color, size, style against master catalog","Generated new barcodes, reintroduced as sellable stock","Reduced pilferage by 4% via data-driven packaging","Reduced bad quality inventory by 40%","Built financial reports for Legal, Finance, Warehouse Ops"],impact:"Recovered ~2 million items worth ~$25 million+. Won 'Make It Happen' Award"},
    ]
  },
  {
    id:"era-2017",
    year:"2017–19", company:"Infosys", role:"Associate Analyst", location:"Bangalore",
    color:"#6366f1", summary:"Predictive models and route optimization for global enterprise clients (UPS, Starbucks)",
    projects:[
      {title:"Driver Churn & Route Optimization",desc:"ML models predicting driver attrition and optimizing delivery routes for a global logistics company. Reporting automation for a global coffee chain.",details:["Driver churn prediction using ML classification","Bid win/loss prediction using Random Forest","Route optimization: Clark-Wright + genetic algorithms","Sales anomaly detection via web scraping","Reporting automation for global coffee chain"],impact:"Models deployed for US operations; route optimization recognized by team"},
    ]
  },
];

const companyLinks=[
  {name:"Reliance Retail",target:"era-2025"},
  {name:"Flipkart",target:"era-2021"},
  {name:"Myntra",target:"era-2019"},
  {name:"Infosys",target:"era-2017"},
];

export default function App(){
  const[chatOpen,setChatOpen]=useState(false);
  const[msgs,setMsgs]=useState([{role:"model",content:"Hi! I'm Chirayu's AI assistant. Ask me anything — about his career, projects, what he's like to work with, or how to get in touch."}]);
  const[input,setInput]=useState("");
  const[loading,setLoading]=useState(false);
  const[mobileNav,setMobileNav]=useState(false);
  const[resumeOpen,setResumeOpen]=useState(false);
  const chatEnd=useRef(null);
  const resumeRef=useRef(null);

  useEffect(()=>{chatEnd.current?.scrollIntoView({behavior:"smooth"})},[msgs]);

  useEffect(()=>{
    const close=e=>{if(resumeRef.current&&!resumeRef.current.contains(e.target))setResumeOpen(false)};
    document.addEventListener("mousedown",close);
    return()=>document.removeEventListener("mousedown",close);
  },[]);

  const send=async()=>{
    if(!input.trim()||loading)return;
    const q=input.trim();setInput("");
    setMsgs(p=>[...p,{role:"user",content:q}]);setLoading(true);
    try{
      const history=msgs.slice(1).map(m=>({role:m.role==="model"?"model":"user",parts:[{text:m.content}]}));
      const r=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_KEY}`,{
        method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({systemInstruction:{parts:[{text:chatContext}]},contents:[...history,{role:"user",parts:[{text:q}]}],generationConfig:{maxOutputTokens:800,temperature:0.7}}),
      });
      if(!r.ok)throw new Error(`API ${r.status}`);
      const d=await r.json();
      setMsgs(p=>[...p,{role:"model",content:d.candidates?.[0]?.content?.parts?.[0]?.text||"Sorry, please try again."}]);
    }catch(e){console.error(e);setMsgs(p=>[...p,{role:"model",content:"Something went wrong. Reach out at chirayu.v.kainya@gmail.com!"}]);}
    setLoading(false);
  };

  const openCalendly=()=>{window.Calendly?.initPopupWidget({url:CALENDLY_URL});};
  const go=id=>{document.getElementById(id)?.scrollIntoView({behavior:"smooth"});setMobileNav(false);};
  const nav=["home","about","work","contact"];

  return(
    <div style={{background:NAVY,color:TEXT,fontFamily:"'Outfit',sans-serif",minHeight:"100vh"}}>
      <style>{`
        *{margin:0;padding:0;box-sizing:border-box}html{scroll-behavior:smooth}
        ::selection{background:${GOLD}44;color:${GOLD}}
        ::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:${NAVY}}::-webkit-scrollbar-thumb{background:${ACCENT}66;border-radius:3px}
        @keyframes glow{0%,100%{box-shadow:0 0 20px ${GOLD}22}50%{box-shadow:0 0 40px ${GOLD}44}}
        @keyframes pulse{0%,100%{opacity:.4}50%{opacity:1}}
        @keyframes fadeIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        .nav-link{color:${DIM};text-decoration:none;font-size:13px;font-weight:500;text-transform:uppercase;letter-spacing:2px;padding:8px 0;cursor:pointer;transition:color .3s;border-bottom:2px solid transparent}
        .nav-link:hover{color:${GOLD};border-color:${GOLD}}
        .chat-msg{max-width:85%;padding:12px 16px;border-radius:16px;font-size:14px;line-height:1.7;word-wrap:break-word;white-space:pre-wrap}
        .timeline-era{position:relative;padding-left:40px}
        .timeline-era::before{content:'';position:absolute;left:11px;top:24px;bottom:0;width:2px;background:${ACCENT}44}
        .timeline-era:last-child::before{display:none}
        .timeline-dot{position:absolute;left:2px;top:8px;width:20px;height:20px;border-radius:50%;border:3px solid;display:flex;align-items:center;justify-content:center;z-index:1;background:${NAVY2}}
        .project-card{padding:20px 24px;border-radius:12px;border:1px solid ${ACCENT}33;background:${NAVY3};transition:border-color .3s}
        .project-card:hover{border-color:${ACCENT}66}
        .resume-dropdown{position:absolute;top:100%;right:0;margin-top:8px;background:${NAVY3};border:1px solid ${ACCENT}44;border-radius:10px;overflow:hidden;min-width:200px;box-shadow:0 12px 40px rgba(0,0,0,.4);z-index:10}
        .resume-dropdown a{display:flex;align-items:center;gap:10px;padding:12px 16px;color:${TEXT};text-decoration:none;font-size:13px;font-weight:500;transition:background .2s}
        .resume-dropdown a:hover{background:${ACCENT}33}
        .resume-dropdown a:not(:last-child){border-bottom:1px solid ${ACCENT}33}
        @media(max-width:768px){
          .hide-mobile{display:none!important}.show-mobile{display:flex!important}
          .hero-flex{flex-direction:column!important;text-align:center!important;gap:32px!important}
          .hero-photo{width:160px!important;height:160px!important}
          .hero-text{min-width:auto!important;text-align:center!important}
          .hero-buttons{justify-content:center!important}
          .section-pad{padding:60px 20px!important}
          .company-bar{flex-wrap:wrap!important;gap:16px!important}
          .timeline-era{padding-left:32px}
          .proj-grid{grid-template-columns:1fr!important}
        }
        @media(min-width:769px){.show-mobile{display:none!important}}
      `}</style>

      {/* NAV */}
      <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:100,background:`${NAVY}ee`,backdropFilter:"blur(20px)",borderBottom:`1px solid ${ACCENT}22`}}>
        <div style={{maxWidth:1200,margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",height:60,padding:"0 32px"}}>
          <span style={{fontSize:18,fontWeight:700,color:GOLD,cursor:"pointer"}} onClick={()=>go("home")}>Chirayu Kainya</span>
          <div className="hide-mobile" style={{display:"flex",gap:28,alignItems:"center"}}>
            {nav.map(n=><span key={n} className="nav-link" onClick={()=>go(n)}>{n}</span>)}
            <div ref={resumeRef} style={{position:"relative"}}>
              <button onClick={()=>setResumeOpen(!resumeOpen)} style={{display:"flex",alignItems:"center",gap:6,padding:"7px 16px",background:GOLD,color:NAVY,border:"none",borderRadius:6,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"inherit",letterSpacing:1,textTransform:"uppercase"}}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                Resume
              </button>
              {resumeOpen&&(
                <div className="resume-dropdown">
                  <a href="/Chirayu_Kainya_Resume.pdf" download>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                    Full Resume (3 pages)
                  </a>
                  <a href="/Chirayu_Kainya_One_Pager.html" target="_blank" rel="noopener noreferrer">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
                    One Pager (printable)
                  </a>
                </div>
              )}
            </div>
          </div>
          <button className="show-mobile" onClick={()=>setMobileNav(!mobileNav)} style={{display:"none",background:"none",border:"none",color:TEXT,fontSize:24,cursor:"pointer"}}>☰</button>
        </div>
        {mobileNav&&<div className="show-mobile" style={{display:"none",flexDirection:"column",padding:"12px 32px 16px",gap:12,borderTop:`1px solid ${ACCENT}33`}}>
          {nav.map(n=><span key={n} className="nav-link" onClick={()=>go(n)}>{n}</span>)}
          <a href="/Chirayu_Kainya_Resume.pdf" download className="nav-link" style={{color:GOLD}}>Download Resume</a>
        </div>}
      </nav>

      {/* HERO */}
      <section id="home" style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",position:"relative",overflow:"hidden",padding:"100px 32px 60px"}}>
        <div style={{position:"absolute",inset:0,background:`radial-gradient(ellipse at 20% 30%,${ACCENT}30 0%,transparent 60%),radial-gradient(ellipse at 80% 70%,${GOLD}08 0%,transparent 50%)`}}/>
        <div className="hero-flex" style={{position:"relative",maxWidth:1000,display:"flex",alignItems:"center",gap:60,flexWrap:"wrap",justifyContent:"center"}}>
          <div style={{flexShrink:0}}>
            <div className="hero-photo" style={{width:220,height:220,borderRadius:"50%",border:`3px solid ${GOLD}`,padding:4,animation:"glow 4s ease-in-out infinite"}}>
              <img src="/headshot.png" alt="Chirayu Kainya" style={{width:"100%",height:"100%",borderRadius:"50%",objectFit:"cover"}}
                onError={e=>{e.target.style.display="none";e.target.parentElement.innerHTML='<div style="width:100%;height:100%;border-radius:50%;background:#1c2d3f;display:flex;align-items:center;justify-content:center;font-size:36px;font-weight:800;color:#d4a853">CK</div>';}}/>
            </div>
          </div>
          <div className="hero-text" style={{textAlign:"left",flex:1,minWidth:280}}>
            <div style={{fontSize:13,fontWeight:500,color:GOLD,letterSpacing:4,textTransform:"uppercase",marginBottom:16}}>Merchandise Planning · Digital Twins · Store Operations</div>
            <h1 style={{fontSize:"clamp(36px,5vw,56px)",fontWeight:800,lineHeight:1.1,marginBottom:16}}>Chirayu <span style={{color:GOLD}}>Kainya</span></h1>
            <p style={{fontSize:"clamp(16px,2.5vw,20px)",fontWeight:300,color:DIM,marginBottom:32}}>AI-Native Business Leader  |  Data-Driven Retail Strategist</p>
            <div className="hero-buttons" style={{display:"flex",gap:12,flexWrap:"wrap"}}>
              <button onClick={()=>go("work")} style={{padding:"12px 28px",background:GOLD,color:NAVY,border:"none",borderRadius:8,fontSize:14,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>See My Work</button>
              <a href="/Chirayu_Kainya_Resume.pdf" download style={{padding:"12px 28px",background:"transparent",color:GOLD,border:`1px solid ${GOLD}`,borderRadius:8,fontSize:14,fontWeight:600,cursor:"pointer",fontFamily:"inherit",textDecoration:"none",display:"inline-flex",alignItems:"center",gap:8}}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                Resume
              </a>
              <button onClick={()=>setChatOpen(true)} style={{padding:"12px 28px",background:"transparent",color:GOLD,border:`1px solid ${GOLD}`,borderRadius:8,fontSize:14,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>Ask My AI</button>
            </div>
          </div>
        </div>
      </section>

      {/* COMPANIES */}
      <section style={{background:NAVY2,borderTop:`1px solid ${ACCENT}22`,borderBottom:`1px solid ${ACCENT}22`,padding:"28px 32px"}}>
        <div className="company-bar" style={{maxWidth:700,margin:"0 auto",display:"flex",justifyContent:"center",alignItems:"center",gap:48}}>
          <span style={{fontSize:12,color:DIM,letterSpacing:2,textTransform:"uppercase",flexShrink:0}}>Worked with</span>
          {companyLinks.map((c,i)=>(
            <span key={i} style={{fontSize:15,fontWeight:600,color:TEXT,cursor:"pointer",transition:"color .3s",borderBottom:`2px solid transparent`}}
              onMouseEnter={e=>{e.target.style.color=GOLD;e.target.style.borderColor=GOLD}}
              onMouseLeave={e=>{e.target.style.color=TEXT;e.target.style.borderColor="transparent"}}
              onClick={()=>go(c.target)}
            >{c.name}</span>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="section-pad" style={{padding:"100px 32px"}}>
        <div style={{maxWidth:800,margin:"0 auto"}}>
          <p style={{fontSize:13,color:GOLD,letterSpacing:4,textTransform:"uppercase",marginBottom:8}}>About</p>
          <h2 style={{fontSize:"clamp(28px,4vw,40px)",fontWeight:700,marginBottom:32,lineHeight:1.2}}>I build technology for <span style={{color:GOLD}}>physical retail</span></h2>
          <div style={{fontSize:17,lineHeight:2,color:DIM}}>
            <p style={{marginBottom:20}}>Most people think retail is just stores and shelves. I see it as a massive data problem — where every product on every fixture in every store is a decision that can be optimized.</p>
            <p style={{marginBottom:20}}>Over 8+ years, I moved from building <strong style={{color:TEXT}}>predictive models for global logistics companies</strong>, to <strong style={{color:TEXT}}>recovering $25 million in lost warehouse inventory</strong>, to now leading the <strong style={{color:TEXT}}>digital transformation of 2,000+ retail stores</strong>.</p>
            <p style={{marginBottom:20}}>My current work: I've built <strong style={{color:TEXT}}>Digital Twins</strong> of physical stores, <strong style={{color:TEXT}}>automated store audits</strong> using computer vision and RFID, and created an <strong style={{color:TEXT}}>AI agent</strong> that scans competitor data and recommends how stores should rearrange their shelves for better sales.</p>
            <p>I learn by being on the ground — visiting stores weekly, sitting with merchandisers, understanding how things actually work.</p>
          </div>
        </div>
      </section>

      {/* WORK — Vertical Timeline */}
      <section id="work" className="section-pad" style={{padding:"100px 32px",background:NAVY2}}>
        <div style={{maxWidth:900,margin:"0 auto"}}>
          <p style={{fontSize:13,color:GOLD,letterSpacing:4,textTransform:"uppercase",marginBottom:8}}>Work</p>
          <h2 style={{fontSize:"clamp(28px,4vw,40px)",fontWeight:700,marginBottom:48}}>8+ years of building <span style={{color:GOLD}}>what didn't exist</span></h2>

          {timeline.map((era,i)=>(
            <div key={i} id={era.id} className="timeline-era" style={{marginBottom:i<timeline.length-1?48:0}}>
              <div className="timeline-dot" style={{borderColor:era.color}}/>

              {/* Era header */}
              <div style={{marginBottom:20}}>
                <div style={{display:"flex",alignItems:"baseline",gap:12,flexWrap:"wrap",marginBottom:6}}>
                  <span style={{fontSize:14,fontWeight:700,color:era.color,letterSpacing:1}}>{era.year}</span>
                  <span style={{fontSize:20,fontWeight:700,color:TEXT}}>{era.role}</span>
                </div>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
                  <span style={{fontSize:15,color:era.color,fontWeight:500}}>{era.company}</span>
                  <span style={{fontSize:13,color:DIM}}>· {era.location}</span>
                </div>
                <p style={{fontSize:15,color:DIM,lineHeight:1.7}}>{era.summary}</p>
              </div>

              {/* Projects */}
              <div className="proj-grid" style={{display:"grid",gridTemplateColumns:"1fr",gap:16}}>
                {era.projects.map((p,pi)=>(
                  <div key={pi} className="project-card">
                    <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
                      <div style={{width:8,height:8,borderRadius:"50%",background:era.color,flexShrink:0}}/>
                      <span style={{fontSize:16,fontWeight:700,color:TEXT}}>{p.title}</span>
                    </div>
                    <p style={{fontSize:14,color:DIM,lineHeight:1.7,marginBottom:14}}>{p.desc}</p>
                    <div style={{marginBottom:14}}>
                      {p.details.map((d,j)=>(
                        <div key={j} style={{display:"flex",gap:10,marginBottom:6}}>
                          <span style={{color:era.color,fontSize:12,marginTop:3,flexShrink:0}}>▸</span>
                          <span style={{fontSize:13,color:DIM,lineHeight:1.6}}>{d}</span>
                        </div>
                      ))}
                    </div>
                    <div style={{padding:"10px 14px",background:`${era.color}10`,border:`1px solid ${era.color}20`,borderRadius:8}}>
                      <span style={{fontSize:13,color:era.color,fontWeight:600}}>Impact: </span>
                      <span style={{fontSize:13,color:TEXT}}>{p.impact}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT (consolidated) */}
      <section id="contact" className="section-pad" style={{padding:"100px 32px",textAlign:"center"}}>
        <div style={{maxWidth:650,margin:"0 auto"}}>
          <p style={{fontSize:13,color:GOLD,letterSpacing:4,textTransform:"uppercase",marginBottom:8}}>Get in Touch</p>
          <h2 style={{fontSize:"clamp(28px,4vw,40px)",fontWeight:700,marginBottom:16}}>Let's build something <span style={{color:GOLD}}>together</span></h2>
          <p style={{fontSize:16,color:DIM,lineHeight:1.8,marginBottom:36}}>Open to new opportunities, partnerships, advisory roles, and mentoring. Whether you're building in retail tech, scaling operations with AI, or just want to exchange ideas — let's connect.</p>
          <div style={{display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap",marginBottom:24}}>
            <a href="mailto:chirayu.v.kainya@gmail.com" style={{padding:"12px 28px",background:GOLD,color:NAVY,border:"none",borderRadius:8,fontSize:14,fontWeight:600,textDecoration:"none",fontFamily:"inherit"}}>Email Me</a>
            <a href="https://www.linkedin.com/in/chirayukainya/" target="_blank" rel="noopener noreferrer" style={{padding:"12px 28px",background:"transparent",color:GOLD,border:`1px solid ${GOLD}`,borderRadius:8,fontSize:14,fontWeight:600,textDecoration:"none",fontFamily:"inherit"}}>LinkedIn</a>
            <button onClick={openCalendly} style={{padding:"12px 28px",background:"transparent",color:GOLD,border:`1px solid ${GOLD}`,borderRadius:8,fontSize:14,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>Book a Call</button>
            <button onClick={()=>setChatOpen(true)} style={{padding:"12px 28px",background:"transparent",color:GOLD,border:`1px solid ${GOLD}`,borderRadius:8,fontSize:14,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>Ask My AI</button>
          </div>
          <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
            <a href="/Chirayu_Kainya_Resume.pdf" download style={{display:"inline-flex",alignItems:"center",gap:8,padding:"10px 20px",background:`${ACCENT}44`,color:TEXT,border:`1px solid ${ACCENT}66`,borderRadius:8,fontSize:13,fontWeight:500,textDecoration:"none",fontFamily:"inherit",transition:"background .2s"}}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Full Resume (PDF)
            </a>
            <a href="/Chirayu_Kainya_One_Pager.html" target="_blank" rel="noopener noreferrer" style={{display:"inline-flex",alignItems:"center",gap:8,padding:"10px 20px",background:`${ACCENT}44`,color:TEXT,border:`1px solid ${ACCENT}66`,borderRadius:8,fontSize:13,fontWeight:500,textDecoration:"none",fontFamily:"inherit",transition:"background .2s"}}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
              One Pager (printable)
            </a>
          </div>
        </div>
      </section>

      <footer style={{padding:"28px 32px",borderTop:`1px solid ${ACCENT}22`,textAlign:"center"}}><p style={{fontSize:12,color:DIM}}>© 2026 Chirayu Kainya. Built with intent.</p></footer>

      {/* CHAT FAB */}
      {!chatOpen&&<button onClick={()=>setChatOpen(true)} style={{position:"fixed",bottom:24,right:24,width:52,height:52,borderRadius:"50%",background:GOLD,color:NAVY,border:"none",fontSize:22,cursor:"pointer",boxShadow:`0 4px 20px ${GOLD}44`,zIndex:200,display:"flex",alignItems:"center",justifyContent:"center"}}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></button>}

      {/* CHAT */}
      {chatOpen&&(
        <div style={{position:"fixed",bottom:24,right:24,width:"min(400px,calc(100vw - 48px))",height:"min(520px,calc(100vh - 100px))",background:NAVY3,border:`1px solid ${ACCENT}44`,borderRadius:20,display:"flex",flexDirection:"column",overflow:"hidden",zIndex:200,boxShadow:`0 20px 60px ${NAVY}cc`}}>
          <div style={{padding:"14px 18px",background:NAVY2,borderBottom:`1px solid ${ACCENT}33`,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <div><div style={{fontSize:14,fontWeight:600}}>Ask about Chirayu</div><div style={{fontSize:11,color:GOLD}}>AI-powered · Knows his full career</div></div>
            <button onClick={()=>setChatOpen(false)} style={{background:"none",border:"none",color:DIM,fontSize:18,cursor:"pointer"}}>✕</button>
          </div>
          <div style={{flex:1,overflow:"auto",padding:14,display:"flex",flexDirection:"column",gap:10}}>
            {msgs.map((m,i)=>(
              <div key={i} style={{display:"flex",justifyContent:m.role==="user"?"flex-end":"flex-start"}}>
                <div className="chat-msg" style={{background:m.role==="user"?BLUE:NAVY2,color:m.role==="user"?"#fff":TEXT,borderBottomRightRadius:m.role==="user"?4:16,borderBottomLeftRadius:m.role==="user"?16:4,border:m.role==="user"?"none":`1px solid ${ACCENT}33`}}>
                  {m.content.includes("[BOOK_NOW]")?m.content.split("[BOOK_NOW]").map((part,j,arr)=><span key={j}>{part}{j<arr.length-1&&<button onClick={openCalendly} style={{display:"block",margin:"10px 0 4px",padding:"10px 20px",background:GOLD,color:NAVY,border:"none",borderRadius:8,fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>Book a Time</button>}</span>):m.content}
                </div>
              </div>
            ))}
            {loading&&<div style={{display:"flex"}}><div className="chat-msg" style={{background:NAVY2,border:`1px solid ${ACCENT}33`,borderBottomLeftRadius:4}}><span style={{animation:"pulse 1.5s infinite"}}>Thinking...</span></div></div>}
            <div ref={chatEnd}/>
          </div>
          <div style={{padding:"10px 14px",borderTop:`1px solid ${ACCENT}33`,display:"flex",gap:8}}>
            <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder="Ask anything about Chirayu..." style={{flex:1,padding:"10px 14px",background:NAVY,border:`1px solid ${ACCENT}44`,borderRadius:10,color:TEXT,fontSize:13,fontFamily:"inherit",outline:"none"}}/>
            <button onClick={send} disabled={loading} style={{padding:"10px 16px",background:GOLD,color:NAVY,border:"none",borderRadius:10,fontWeight:600,cursor:"pointer",fontSize:13,fontFamily:"inherit",opacity:loading?.5:1}}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}
