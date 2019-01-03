function OnLoad()
{
  var playerHealth = 100

  localStorage.setItem("playerHealth", "100")

  var enemyHealth = 100

  localStorage.setItem("enemyHealth", "100")

  var area = 1

  localStorage.setItem("area", 1)

  var isWeaponCharged = 1;

  localStorage.setItem("isWeaponCharged", 1)

  localStorage.setItem("accessOne", 0)
  localStorage.setItem("accessTwo", 0)
  localStorage.setItem("accessThree", 0)

  localStorage.setItem("Generators",0)

  localStorage.setItem("text",0)

  console.log(localStorage.getItem('text'))


}




function Attack()
{

  if(localStorage.getItem('playerHealth') > 0 && localStorage.getItem('enemyHealth') > 0)
  {
    var attacktype = document.getElementById('playerAttack').value;

    if (attacktype == 1)
    {

      var damage = Math.floor((Math.random() * 15) + 5);
      playerAnimationLight()

      if (localStorage.getItem('isWeaponCharged') == 0)
      {
        localStorage.setItem('isWeaponCharged', 1)
        document.getElementById('heavyWeapon').innerHTML = "Ready"

      }

      localStorage.setItem("playerDamage", damage)
    }

    else if (attacktype == 2)
    {
      if (localStorage.getItem('isWeaponCharged') == 1)
      {
        var damage = Math.floor((Math.random() * 40) + 10);;
        playerAnimationHeavy()
        localStorage.setItem('isWeaponCharged', 0)
        document.getElementById('heavyWeapon').innerHTML = "Charging"
      }
      else if (localStorage.getItem('isWeaponCharged') == 0)
      {
        var damage = 0
        document.getElementById('heavyWeapon').innerHTML = "Charging"

      }

      localStorage.setItem("playerDamage", damage)

    }
    if (localStorage.getItem('area') == 1)
    {
      enemyDamage = Math.floor((Math.random() * 10) + 1);

      if (enemyDamage > 5)
      {
        enemyAnimationHeavy()
      }

      else
      {
        enemyAnimationLight()
      }
    }
    else if (localStorage.getItem('area') == 2 || localStorage.getItem('area') == 3 || localStorage.getItem('area') == 4 || localStorage.getItem('area') == 5)
    {
      enemyDamage = Math.floor((Math.random() * 15) + 1);
        localStorage.setItem("enemyDamage", enemyDamage)

      if (enemyDamage > 7)
      {
        enemyAnimationHeavy()
      }

      else
      {
        enemyAnimationLight()
      }
    }
    else if (localStorage.getItem('area') == 6)
      {
        enemyDamage = Math.floor((Math.random() * 20) + 10);

        if (enemyDamage > 10)
        {
          enemyAnimationHeavy()
        }

        else
        {
          enemyAnimationLight()
        }
      }
      else
      {
        enemyDamage = 0
      }
    calculatePlayerHealth()
    calculateEmemyHealth()
    console.log(enemyDamage, damage)
  }




}

function calculatePlayerHealth()
{
  if(localStorage.getItem("area") != 6)
  {
    var currentHealth = localStorage.getItem("playerHealth");

    currentHealth = currentHealth - enemyDamage
  }
  else if (localStorage.getItem("area") == 6)
  {
      var repairedHealth = Math.floor((Math.random() * 15) + 1)

      var currentHealth = localStorage.getItem("playerHealth");

      currentHealth = (currentHealth - enemyDamage) + repairedHealth
  }

  if (currentHealth <= 0)
  {
    currentHealth = 0
    document.getElementById('pSprite').src="img/PR-001dead.png"
    document.getElementById('commanderText').innerHTML=" WARNING - SYSTEM ERROR - INCURSION ALERT - PRIMARY SYSTEMS DISABLED - SECONDARY SYSTEMS DISABLED - WEAPON SYSTEMS DISABLED - LIFE SUPPORT SYSTEMS DISABLED - SYSTEMS COMPROMISED - PROTOCOL 146 INITITED : SELF-DESTRUCT SEQUENCE INITIATED"
    alert("You have died, Refresh page to start again")
    document.getElementById('commanderText').style.color="red";
  }

  localStorage.setItem("playerHealth", currentHealth)

  document.getElementById("Health").innerHTML = currentHealth
}

function calculateEmemyHealth()
{
  var currentEnemyHealth = localStorage.getItem("enemyHealth");

  var playerDamageDealt = localStorage.getItem("playerDamage");

  currentEnemyHealth = currentEnemyHealth - playerDamageDealt

  if (currentEnemyHealth <= 0 && localStorage.getItem('area') == 1)
  {
    currentEnemyHealth = 0
    localStorage.setItem('enemyHealth', 0)
    document.getElementById('enemyHealth').innerHTML="0"
    document.getElementById('eSprite').src="img/Enemydead.png"
    document.getElementById('collectKeycard').disabled=false;
    document.getElementById('commanderText').innerHTML="Good job on that fight, get that KEYCARD and move onto the next area"
  }
  else if(currentEnemyHealth <= 0 && localStorage.getItem('area') == 2)
  {
    currentEnemyHealth = 0
    localStorage.setItem('enemyHealth', 0)
    document.getElementById('eSprite').src="img/Enemydead.png"
    document.getElementById('enterMines').disabled=false;
    document.getElementById('enterPrison').disabled=false;
    document.getElementById('enterFactory').disabled=false;
    document.getElementById('commanderText').innerHTML="Looks like we need to collect 3 ACCESS CARDS to reach the Power room. Lets clear the MINES, PRISON and FACTORY"

  }
  else if (currentEnemyHealth <= 0 && localStorage.getItem('area') == 3)
  {
    currentEnemyHealth = 0
    document.getElementById('eSprite').src="img/Enemydead.png"
    document.getElementById('collectAccessOne').disabled=false;
  }
  else if (currentEnemyHealth <= 0 && localStorage.getItem('area') == 4)
  {
    currentEnemyHealth = 0
    document.getElementById('eSprite').src="img/Enemydead.png"
    document.getElementById('collectAccessTwo').disabled=false;
  }
  else if (currentEnemyHealth <= 0 && localStorage.getItem('area') == 5)
  {
    currentEnemyHealth = 0
    document.getElementById('eSprite').src="img/Enemydead.png"
    document.getElementById('collectAccessThree').disabled=false;
  }
  else if (currentEnemyHealth <= 0 && localStorage.getItem('area') == 6)
  {
    currentEnemyHealth = 0
    document.getElementById('eSprite').src="img/Enemydead.png"
    document.getElementById('commanderText').innerHTML="Great job pilot, now deactivate the GENERATORS and your mission is complete"
    document.getElementById('gen1').disabled=false;

  }

  localStorage.setItem("enemyHealth", currentEnemyHealth)

  document.getElementById("enemyHealth").innerHTML = currentEnemyHealth
}

function citadelEntrance()
{
  localStorage.setItem("area", 2)
  localStorage.setItem("enemyHealth", "110")
  localStorage.setItem("playerHealth", "100")
  document.getElementById('eSprite').src="img/Enemy.png"
  document.getElementById('enemyHealth').innerHTML="110"
  document.getElementById('enemyMaxHealth').innerHTML="110"
  document.getElementById('enterCitadel').disabled = true;
  document.getElementById('Health').innerHTML="100"
  document.getElementById('attackButton').disabled=false;
  document.getElementById('areas').innerHTML = " - Inner Citadel"
  document.getElementById("commanderText").innerHTML="Another Mech, you know the drill"

}

function enterMines()
{
  localStorage.setItem("area", 3)
  localStorage.setItem("enemyHealth", "110")
  localStorage.setItem("playerHealth", "100")
  document.getElementById('eSprite').src="img/Enemy.png"
  document.getElementById('enemyHealth').innerHTML="110"
  document.getElementById('enemyMaxHealth').innerHTML="110"
  document.getElementById('enterMines').disabled = true;
  document.getElementById('enterPrison').disabled=true;
  document.getElementById('enterFactory').disabled=true;
  document.getElementById('Health').innerHTML="100"
  document.getElementById('attackButton').disabled=false;
  document.getElementById('areas').innerHTML = " - Mines"
  document.getElementById('commanderText').innerHTML=" These mines hold the resources that the Omega Cult use to construct their machines. Capturing this would be a massive help to our cause, of course, it can't be done until we take down the power core"
}

function enterPrison()
{
  localStorage.setItem("area", 4)
  localStorage.setItem("enemyHealth", "120")
  localStorage.setItem("playerHealth", "100")
  document.getElementById('eSprite').src="img/Enemy.png"
  document.getElementById('enemyHealth').innerHTML="110"
  document.getElementById('enemyMaxHealth').innerHTML="110"
  document.getElementById('enterMines').disabled = true;
  document.getElementById('enterPrison').disabled=true;
  document.getElementById('enterFactory').disabled=true;
  document.getElementById('Health').innerHTML="100"
  document.getElementById('attackButton').disabled=false;
  document.getElementById('areas').innerHTML = " - Prison"
  document.getElementById("commanderText").innerHTML="Too many of our people were brought here. Once we free them, we shall be a force to be reckoned with"
}
function enterFactory()
{
  localStorage.setItem("area", 5)
  localStorage.setItem("enemyHealth", "110")
  localStorage.setItem("playerHealth", "100")
  document.getElementById('eSprite').src="img/Enemy.png"
  document.getElementById('enemyHealth').innerHTML="110"
  document.getElementById('enemyMaxHealth').innerHTML="110"
  document.getElementById('enterMines').disabled = true;
  document.getElementById('enterPrison').disabled=true;
  document.getElementById('enterFactory').disabled=true;
  document.getElementById('Health').innerHTML="100"
  document.getElementById('attackButton').disabled=false;
  document.getElementById('areas').innerHTML = " - Factory"
  document.getElementById("commanderText").innerHTML="This is the heart of the Omega war effort in this area. With this destroyed or captured, our forces will have a much easier time dealing with the remaining Omega Cult"

}

function enterPowerRoom()
{
  localStorage.setItem("area", 6)
  localStorage.setItem("enemyHealth", "140")
  localStorage.setItem("playerHealth", "100")
  document.getElementById('eSprite').src="img/Enemy.png"
  document.getElementById('enemyHealth').innerHTML="140"
  document.getElementById('enemyMaxHealth').innerHTML="140"
  document.getElementById('enterMines').disabled = true;
  document.getElementById('enterPrison').disabled=true;
  document.getElementById('enterFactory').disabled=true;
  document.getElementById('enterPowerRoom').disabled=true;
  document.getElementById('Health').innerHTML="100"
  document.getElementById('attackButton').disabled=false;
  document.getElementById('areas').innerHTML = " - Power Room"
  document.getElementById('commanderText').innerHTML="'Damn, this guy looks tough, Hold on, i'm activating a PROTOTYPE REPAIR SYSTEM' <REPAIR SYSTEM ONLINE>. 'There this should repair some of the damage this guy deals, but its still in the prototype phase so it may do more harm than good'"
}

function backToCitadel()
{
    localStorage.setItem("area", 4)

    document.getElementById('areas').innerHTML="Citadel"

    if (localStorage.getItem('accessOne') == 1)
    {
      document.getElementById('enterPrison').disabled=false;
      document.getElementById('enterFactory').disabled=false;
      document.getElementById('backToCitadel').disabled=true;
    }
    else if (localStorage.getItem('accessTwo') == 1)
    {
      document.getElementById('enterMines').disabled=false;
      document.getElementById('enterFactory').disabled=false;
      document.getElementById('backToCitadel').disabled=true;
    }
    else if (localStorage.getItem('accessThree') == 1)
    {
      document.getElementById('enterMines').disabled=false;
      document.getElementById('enterPrison').disabled=false;
      document.getElementById('backToCitadel').disabled=true;
    }

    if ((localStorage.getItem('accessOne') == 1) && (localStorage.getItem('accessTwo') == 1))
    {
      document.getElementById('enterFactory').disabled=false;
      document.getElementById('enterMines').disabled=true;
      document.getElementById('enterPrison').disabled=true;
      document.getElementById('backToCitadel').disabled=true;
    }
    else if ((localStorage.getItem('accessTwo') == 1) && (localStorage.getItem('accessThree') == 1))
    {
      document.getElementById('enterMines').disabled=false;
      document.getElementById('enterFactory').disabled=true;
      document.getElementById('enterPrison').disabled=true;
      document.getElementById('backToCitadel').disabled=true;
    }
    else if ((localStorage.getItem('accessOne') == 1) && (localStorage.getItem('accessThree') == 1))
    {
      document.getElementById('enterPrison').disabled=false;
      document.getElementById('enterFactory').disabled=true;
      document.getElementById('enterMines').disabled=true;
      document.getElementById('backToCitadel').disabled=true;
    }

    if ((localStorage.getItem('accessOne') == 1) && (localStorage.getItem('accessTwo') == 1) && (localStorage.getItem('accessThree') == 1))
    {
      document.getElementById('enterPowerRoom').disabled=false;
      document.getElementById('enterMines').disabled=true;
      document.getElementById('enterPrison').disabled=true;
      document.getElementById('enterFactory').disabled=true;
    }

}

function collectKeycard()
{
  document.getElementById('enterCitadel').disabled=false;
  document.getElementById('collectKeycard').disabled=true;
  document.getElementById('keycard').src="img/keycard.png"
}


function accessCardOne()
{
  localStorage.setItem("accessOne", 1)
  document.getElementById('backToCitadel').disabled=false;
  document.getElementById('collectAccessOne').disabled=true;
  document.getElementById('access1').src="img/accessOne.png"

}
function accessCardTwo()
{
  localStorage.setItem("accessTwo", 1)
  document.getElementById('backToCitadel').disabled=false;
  document.getElementById('collectAccessTwo').disabled=true;
  document.getElementById('access2').src="img/accessTwo.png"

}
function accessCardThree()
{
  localStorage.setItem("accessThree", 1)
  document.getElementById('backToCitadel').disabled=false;
  document.getElementById('collectAccessThree').disabled=true;
  document.getElementById('access3').src="img/accessThree.png"
}

function enableBoss() /*REMEMBER TO REMOVE PIECE OF CODE LATER*/
{
  document.getElementById('enterPowerRoom').disabled=false;
}

function gen1()
{
  document.getElementById('commanderText').innerHTML="GENERATOR #1 DEACTIVATED"
  document.getElementById('commanderText').style.color="red";
  document.getElementById('gen2').disabled=false;
  document.getElementById('gen1').disabled=true;

  localStorage.setItem("Generators", 1)

}

function gen2()
{
  document.getElementById('commanderText').innerHTML="GENERATOR #2 DEACTIVATED"
  document.getElementById('commanderText').style.color="red";
  document.getElementById('gen3').disabled=false;
  document.getElementById('gen2').disabled=true;
  localStorage.setItem("Generators", 2)
}

function gen3()
{
  document.getElementById('commanderText').innerHTML="YOUR INSOLENCE HAS BEEN NOTICED BY THE OMEGA CULT HIGH COMMAND, FACILITY SELF DESTRUCTION SEQUENCE INITIATED"
  document.getElementById('commanderText').style.color="red";
  document.getElementById('gen3').disabled=true;
  localStorage.setItem("Generators", 3)
  document.getElementById("commanderButton").disabled = false

}



function nextText()
{
  var text = localStorage.getItem('text')

  {
    if (text == 0)
    {
      document.getElementById('commanderText').innerHTML="YOUR INSOLENCE HAS BEEN NOTICED BY THE OMEGA CULT HIGH COMMAND, FACILITY SELF DESTRUCTION SEQUENCE INITIATED"
      document.getElementById('commanderText').style.color="red";
      text = 1
    }

    if (text == 1)
    {
        document.getElementById('commanderText').style.color="white";
        document.getElementById('commanderText').innerHTML="Great job, now get the hell out of there before the faclity blows!"
        text = 2
    }

    else if (text == 2)
    {
      document.getElementById('commanderText').innerHTML="FACLITY SELF DESTRUCTION SEQUENCE IN 3..."
      document.getElementById('commanderText').style.color="red";
      text = 3
    }

    else if (text == 3)
    {
      document.getElementById('commanderText').innerHTML="FACLITY SELF DESTRUCTION SEQUENCE IN 2..."
      document.getElementById('commanderText').style.color="red";
      text = 4
    }

    else if (text == 4)
    {
      document.getElementById('commanderText').innerHTML="FACLITY SELF DESTRUCTION SEQUENCE IN 1..."
      document.getElementById('commanderText').style.color="red";
      text = 5
    }

    else if (text == 5)
    {
      alert("Thank you for playing, refresh the page to play again")
    }


  console.log(text)

  localStorage.setItem("text", text)


  }
}


/*Animations for sprites*/
function playerAnimationLight()
{
  document.getElementById('pSprite').src="img/PR-001firingLIGHT.gif"
}
function playerAnimationHeavy()
{
  document.getElementById('pSprite').src="img/PR-001firingHEAVY.gif"
}

function enemyAnimationLight()
{
  document.getElementById('eSprite').src="img/EnemyfiringLIGHT.gif"
}
function enemyAnimationHeavy()
{
  document.getElementById('eSprite').src="img/EnemyfiringHEAVY.gif"
}
