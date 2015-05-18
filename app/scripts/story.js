var story = [
        {
          text: "Kvinnor tjänar i genomsnitt <strong>2,6 miljoner kronor mindre</strong> än män över livet",
          sort: "all",
          columns: ["Akademiker_totalt"],
          time: 7
        },
        {
          text: "Män tjänar mer än kvinnor i <strong>nästan alla yrkesgrupper</strong>.",
          sort: "all",
          columns: [],
          time: 37
        },
        {
          text: "Störst är skillnaderna bland <strong>ingenjörer, ekonomer och samhällsvetare</strong>.",
          sort: "all",
          columns: ["Hgsk_ing", "Ekonom", "Civ_ing", "Samhbetvet"],
          time: 41
        },
        {
          text: "Inom <strong>vård och omsorg är skillnaderna minst</strong>, men också där tjänar män mer.",
          sort: "all",
          columns: ["Lakare", "Sjukgymn", "Sjukskoterska","Soc_omsorg","Socionom", "Tandlakare", "Apotekare", "Biomed_analyt"],
          time: 47
        },
        {
          text: "Bara i några få yrken är livslönerna jämställda.",
          sort: "all",
          columns: ["Soc_omsorg","Teolog", "Veterinar", "Biblinfo"],
          time: 58
        }
      ]

var storyMobile = [
  {
    type: "count-up",
    value: 2600000,
    unit: " kr",
    text: "Så mycket mer tjänar manliga akademiker män i snitt under en livstid."
  },
  {
    type: "count-up",
    value: 120,
    unit: "%",
    text: "Här kommer en annan stor siffra."
  }
]