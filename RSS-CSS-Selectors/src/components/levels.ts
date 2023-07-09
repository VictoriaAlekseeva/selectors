const levels = [
  {
    title : "Select the clovers",
    helpTitle : "Select elements by their tag name",
    selectorName : "Type Selector",
    selector : "clover",
    boardMarkup: `
    <clover></clover>
    <clover></clover>
    `
  },
  {
    title : "Select lucky clover",
    helpTitle : "Select elements by their id",
    selectorName : "ID Selector",
    selector : "#lucky",
    boardMarkup: `
    <clover id='lucky'>
    </clover>
    <clover>
    </clover>
    `
  },
  {
    title : "Select small coins",
    helpTitle : "Select elements by their classname",
    selectorName : "Class Selector",
    selector : ".small",
    boardMarkup: `
    <coin>
    </coin>
    <coin class='small'></coin>
    <pot>
      <coin class='small'></coin>
    </pot>
    <pot>
    </pot>
    `
  },
  {
    title : "Select the pot on the rainbow",
    helpTitle : "Select an element inside another element",
    selectorName : "Descendant Selector",
    selector : "rainbow pot",
    boardMarkup: `
    <coin>
    </coin>
    <rainbow>
      <pot></pot>
    </rainbow>
    <pot></pot>
    `
  },
  {
    title : "Select the coin directly on a pot",
    helpTitle : "Select direct children of an element",
    selectorName : "Child Selector",
    selector : "pot > coin",
    boardMarkup: `
    <clover>
    </clover>
    <rainbow>
      <pot>
      <coin class='small'></coin>
      </pot>
    </rainbow>
    <pot></pot>
    <rainbow>
      <coin></coin>
    </rainbow>
    `
  },
  {
    title : "Select the clovers beside the rainbow",
    helpTitle : "Select elements that follows another element",
    selectorName : "General Sibling Selector",
    selector : "rainbow ~ clover",
    boardMarkup: `
    <rainbow>
      <coin class='small'>
    </rainbow>
    <clover class='small'></clover>
    <clover id='lucky'></clover>
    <pot>
      <clover></clover>
    </pot>
    `
  },
  {
    title : "Select every coin that's next to a pot",
    helpTitle : "Select an element that directly follows another element",
    selectorName : "Adjacent Sibling Selector",
    selector : "pot + coin",
    boardMarkup: `
    <pot></pot>
    <coin class='small'></coin>
    <coin></coin>
    <pot></pot>
    <coin></coin>
    <coin class='small'></coin>
    `
  },
  {
    title : "Select the top coins",
    helpTitle : "Select a first child element inside of another element",
    selectorName : "First Child Pseudo-selector",
    selector : "coin:first-child",
    boardMarkup: `
    <rainbow>
    <coin></coin>
    <coin></coin>
    <coin></coin>
    </rainbow>
    <pot></pot>
    <clover></clover>
    `
  },
  {
    title : "Select the 3rd rainbow",
    helpTitle : "Select an element by its order in another element",
    selectorName : "Nth Child Pseudo-selector",
    selector : "rainbow:nth-child(3)",
    boardMarkup: `
    <rainbow></rainbow>
    <rainbow></rainbow>
    <rainbow></rainbow>
    <rainbow></rainbow>
    `
  },
  {
    title : "Select all even pots",
    helpTitle : "Selects a specific element based on its type and order in another element - or even or odd instances of that element.",
    selectorName : "Nth of Type Selector",
    selector : "pot:nth-of-type(even)",
    boardMarkup: `
    <pot></pot>
    <pot></pot>
    <pot></pot>
    <pot></pot>
    <pot></pot>
    `
  }
]

export default levels
