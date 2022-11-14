// Soldier
class Soldier {
  constructor(health, strength) {
    this.health = health;
    this.strength = strength;
  }

  attack() {
    return this.strength;
  }
  receiveDamage(theDamage) {
    this.health -= theDamage;
  }
}

// Viking
class Viking extends Soldier {
  constructor(name, health, strength) {
    super(health, strength);
    this.name = name;
  }

  receiveDamage(theDamage) {
    this.health -= theDamage;
    return this.health > 0
      ? `${this.name} has received ${theDamage} points of damage`
      : `${this.name} has died in act of combat`;
  }

  battleCry() {
    return `Odin Owns You All!`;
  }
}

// Saxon
class Saxon extends Soldier {
  constructor(health, strength, id) {
    super(health, strength, id);
    this.id = id;
  }

  receiveDamage(theDamage) {
    this.health -= theDamage;
    return this.health > 0
      ? `A Saxon has received ${theDamage} points of damage`
      : `A Saxon has died in combat`;
  }
}

// War
class War {
  constructor() {
    this.vikingArmy = [];
    this.saxonArmy = [];
  }

  addViking(theViking) {
    this.vikingArmy.push(theViking);
    return theViking;
  }

  addSaxon(theSaxon) {
    this.saxonArmy.push(theSaxon);
    return theSaxon;
  }

  addVikingToDOM(vikingSoldier, index) {
    let html = `
        <div class="viking-soldier ${vikingSoldier.name}">
          <div class="soldier-info">
            <h5>NAME: <span class="soldier-name">${vikingSoldier.name}</span></h5>
            <h5>HEALTH: <span class="soldier-health">${vikingSoldier.health}%</span></h5>
            <h5>DAMAGE: <span class="soldier-damage">${vikingSoldier.strength}</span></h5>
          </div>
          <div class="soldier-health-bar" style="width:${vikingSoldier.health}%"></div>
        </div>
    `;

    document
      .querySelector('.viking-army')
      .insertAdjacentHTML('beforeend', html);
  }

  addSaxonToDOM(saxonSoldier, index) {
    let html = `
        <div class="saxon-soldier saxon-${index}">
          <div class="soldier-info">
            <h5>HEALTH: <span class="soldier-health">${saxonSoldier.health}%</span></h5>
            <h5>DAMAGE: <span class="soldier-damage">${saxonSoldier.strength}</span></h5>
          </div>
          <div class="soldier-health-bar" style="width:${saxonSoldier.health}%"></div>
        </div>
    `;

    document.querySelector('.saxon-army').insertAdjacentHTML('beforeend', html);
  }

  attack(theArmy) {
    const saxonIndex = Math.floor(Math.random() * this.saxonArmy.length);
    const vikingIndex = Math.floor(Math.random() * this.vikingArmy.length);
    const saxon = this.saxonArmy[saxonIndex];
    const viking = this.vikingArmy[vikingIndex];

    let attack = '';

    if (theArmy === 'saxon') {
      this.selectSoldier(saxon.id);
      this.addLogMessage('saxons', `Saxon soldier attacked ${viking.name}`);
      setTimeout(() => {
        attack = viking.receiveDamage(saxon.strength);
        this.addLogMessage('vikings', attack);
        this.addRedBg(viking.name);
        this.updateHealth(viking.name, viking.health);

        if (viking.health <= 0) {
          this.showKilledMsg(viking.name);

          setTimeout(() => {
            this.vikingArmy.splice(vikingIndex, 1);
            this.removeSoldierDOM(viking.name);
            // this.getStatus();
          }, 1000);
        }
      }, 1500);
    } else if (theArmy === 'viking') {
      this.selectSoldier(viking.name);
      this.addLogMessage('vikings', `${viking.name} attacked a Saxon Soldier`);

      setTimeout(() => {
        attack = saxon.receiveDamage(viking.strength);
        this.addLogMessage('saxons', attack);
        this.addRedBg(saxon.id);
        this.updateHealth(saxon.id, saxon.health);
        if (saxon.health <= 0) {
          this.showKilledMsg(saxon.id);
          setTimeout(() => {
            this.saxonArmy.splice(saxonIndex, 1);
            this.removeSoldierDOM(saxon.id);
            // this.getStatus();
          }, 1000);
        }
      }, 1500);
    } else {
      attack = 'unknown army. try again';
    }

    return attack;
  }
  showKilledMsg(soldier) {
    let html = document.querySelector(`.${soldier}`);
    html.innerHTML = 'KILLED';
    html.classList.add('killed');
  }

  selectSoldier(soldier) {
    let html = document.querySelector(`.${soldier}`);
    html.classList.add('attack-soldier');

    setTimeout(() => {
      html.classList.remove('attack-soldier');
    }, 1500);
  }

  addRedBg(soldier) {
    let html = document.querySelector(`.${soldier}`);
    html.classList.add('red-bg');

    setTimeout(() => {
      html.classList.remove('red-bg');
    }, 1500);
  }

  removeSoldierDOM(soldier) {
    let html = document.querySelector(`.${soldier}`);
    html.remove();
  }

  addLogMessage(army, message) {
    let html = document.querySelector(`.${army}-log`);

    let content = `<div class="${
      message.indexOf('died') !== -1 ? 'red' : ''
    }">${message}</div>`;

    html.insertAdjacentHTML('afterbegin', content);
  }

  updateHealth(soldier, soldierHealth) {
    let healthBar = document.querySelector(`.${soldier} .soldier-health-bar`);
    let healthLabel = document.querySelector(`.${soldier} .soldier-health`);
    let barColor = 'green';
    if (soldierHealth >= 25 && soldierHealth < 65) barColor = 'orange';
    if (soldierHealth < 25) barColor = 'red';

    healthBar.style.background = barColor;
    healthBar.style.width = soldierHealth + '%';
    healthLabel.innerHTML = `${soldierHealth}%`;
  }

  reset() {
    this.vikingArmy = [];
    this.saxonArmy = [];
    document.querySelector(`.viking-army`).innerHTML = '';
    document.querySelector(`.saxon-army`).innerHTML = '';
    document.querySelector(`.vikings-log`).innerHTML = '';
    document.querySelector(`.saxons-log`).innerHTML = '';
  }

  getStatus() {
    if (!this.vikingArmy.length || !this.saxonArmy.length) return false;
    return true;
  }

  showStatus() {
    if (!this.vikingArmy.length)
      return `Saxons have fought for their lives and survived another day...`;
    if (!this.saxonArmy.length)
      return `Vikings have won the war of the century!`;
    if (this.vikingArmy.length && this.saxonArmy.length)
      return `Vikings and Saxons are still in the thick of battle.`;
  }
  vikingAttack() {
    const saxonIndex = Math.floor(Math.random() * this.saxonArmy.length);
    const vikingIndex = Math.floor(Math.random() * this.vikingArmy.length);
    const saxon = this.saxonArmy[saxonIndex];
    const viking = this.vikingArmy[vikingIndex];

    const attack = saxon.receiveDamage(viking.strength);

    if (saxon.health <= 0) this.saxonArmy.splice(saxonIndex, 1);

    return attack;
  }
  saxonAttack() {
    const saxonIndex = Math.floor(Math.random() * this.saxonArmy.length);
    const vikingIndex = Math.floor(Math.random() * this.vikingArmy.length);
    const saxon = this.saxonArmy[saxonIndex];
    const viking = this.vikingArmy[vikingIndex];

    const attack = viking.receiveDamage(saxon.strength);

    if (viking.health <= 0) this.vikingArmy.splice(vikingIndex, 1);

    return attack;
  }
}
