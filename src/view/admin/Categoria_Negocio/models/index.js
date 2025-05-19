const extraEmojis = `🚴‍♀️​🏋️‍♀️​⛹️‍♀️​🏂​⛷️​🏇​🧗‍♀️​🚣​⛹️​⛹️‍♂️​🏊‍♀️​🏊‍♂️​🏊​🐕​🦮​🐕‍🦺​🐩​🐺​🦊​🦆​🦢​🦤​🦩​🦜​🐾​🐦‍🔥​🐦‍⬛​🐣​🐤​🐓​🐔​🦃​🔪​🏺​🫙​🍽️​🍴​🥢​🧉​🍼​🍯​🍮​🧭​🏣​🛖​🏘️​🏠​🏦​🏩​🌉​♨️​🚍​🚞​🏍️​🦽​🚏​🛣️​⛽​🪂​🛩️​✈️​⛵​🚧​⚓​🚦​🛞​🏈​⚾​🏀​⚽​🥉​🎃​🎁​🏒​🥊​🎱​🎮​🕹️​🎰​🎲​🖲️​📔​🎥​🎞️​📽️​🎬​📲​📱​🔌​📼​📹​📸​📷​☎️​📞​💻​🖥️​📻​🎷​🎤​🎛️​🎚️​✏️​🪙​💰​🏷️​📑​🗞️​📰​📜​📃​📓​📗​💼​🔒​🔓​🔐​📆​📅​🗓️​🔨​⛏️​🗝️​⛏️​🛠️​🗡️​🪜​🧲​🪞​🛗​🛒​🔩​🔧​🪚​🛡️​🏹​🔬​🔭​📡​💉​🧷​🪒​🧹​🧺​⚰️​⚱️​🧿​🪬​🗿​🪪​`;

const emojiArray = [...extraEmojis.matchAll(/\p{Extended_Pictographic}/gu)].map(e => e[0]);

const iconoOptions = emojiArray.map(e => ({ value: e, label: e }));


export const Columns = [
  { key: "id", label: "id" },
  { key: "nombre", label: "Categoria" },
  { key: "icono", label: "icono" },
];
export const fields = [
  { name: "nombre", label: "Categoria", type: "text" },
   {
    name: "icono",
    label: "Seleccione Icono",
    type: "select",
      options: [
        { value: "🍇", label: "🍇" },
        { value: "🍔", label: "🍔" },
      ...iconoOptions,
    ],
  },
  { name: "id", label: "ID", type: "number", disable: true },
];