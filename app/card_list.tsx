"use client";

import { parse } from 'csv-parse';
import { Spell } from "./Spell";
import { useEffect, useState } from "react";
import { wizard_csv } from "./wizard";
import Card from "./card";
import { CardProps } from "./CardProps";
import { test } from "node:test";
import { cleric_csv } from "./cleric";
import { ranger_csv } from "./ranger";

export default function CardList() {

  const [cards, setCards] = useState<Spell[]>([]);

  useEffect(() => {
    const headers = ['level', 'name', 'type', 'incantation', 'reach', 'components', 'duration', 'text', 'class'];
    parse(wizard_csv, {
      delimiter: ';',
      columns: headers,
      from_line: 2
    }, (error, result: Spell[]) => {
      if (error) {
        console.error(error);
      }
      setCards(result)
    });
  }, []);

  /*
  const magicItems: CardProps[] = [
    {
      title: 'Bâton de Verre',
      bottomLeft: 'Object Magique',
      bottomRight: 'Bâton',
      image: '/staff.svg',
      imageSize: '50px',
      text: `Ce bâton fin et creux est taillé dans du verre aussi solide que le chêne. Vous devez vous harmoniser avec lui pour bénéficier de ses avantages et lancer ses sorts.<br>
      <br>
      Vous bénéficiez d'un bonus de +1 à la classe d'armure tant que vous le tenez en main<br><br>
      Le bâton contient 10 charges. En le tenant en main, vous pouvez utiliser votre action pour lancer l'un des sorts suivants par son biais, si ce sort fait partie de la liste de sorts de votre classe :<br><br>
       • armure du mage (1 charge),<br>
       • bouclier (2 charges),<br>
      <br>
      Le bâton récupère 1d6+4 charges dépensées chaque jour à l'aube. Si vous dépensez la dernière charge du bâton, lancez un d20. Le bâton est détruit et vole en éclats sur un résultat de 1.
      `,
    },
    {
      title: 'Anneau de Sort Facile',
      bottomLeft: 'Object Magique',
      bottomRight: 'Anneau',
      image: '/ring.svg',
      imageSize: '75px',
      text: `Harmonisation requise avec un lanceur de sorts.<br><br>
      Tant que vous portez cet anneau, vous recevez les bénéfices suivants :<br><br>
      • Vous pouvez vous servir de l'anneau comme focaliseur de sorts<br><br>
      • Vous pouvez tenter de lancer un sort de niveau 0 que vous ne connaissez pas. Le sort doit figurer sur la liste de sorts de votre classe, et vous devez réussir un test avec votre modificateur de sort, DD 10. En cas de réussite, le sort est lancé, en cas d'échec, le sort échoue, et l'action est dépensée. Dans tous les cas, vous ne pouvez pas réutiliser cette propriété avant d'avoir fini un repos long<br>
      `
    },
    {
      title: 'Amulette Mécanique',
      bottomLeft: 'Object Magique',
      bottomRight: 'Amulette',
      image: '/amulet.svg',
      imageSize: '100px',
      text: `Ce pendentif de cuivre renferme de minuscules rouages. Une créature qui porte son oreille contre l'amulette entends un léger cliquetis à l'intérieur.<br><br>
      Lorsque vous effectuez un jet d'attaque en portant l'amulette, vous pouvez renoncer à lancer le d20 pour considérer que vous avez obtenu 10 sur le dé. Une fois utilisée, cette propriété ne peut plus resservir jusqu'à l'aube suivante.
      `
    },
    {
      title: '"Serre" (Épée Longue)',
      bottomLeft: 'Object Magique',
      bottomRight: 'Épée Longue',
      image: '/broadsword.svg',
      imageSize: '100px',
      text: `Le nom de l'épée "Serre" est gravé sur la lame, et sa garde est sculptée en forme d'oiseau de proie aux ailes déployées.<br>
      <br>
      • +1 au jet d'attaque et de dégats`
    },
    {
      title: 'Perche Retractable',
      bottomLeft: 'Object Magique',
      image: '/telescopic.svg',
      imageSize: '100px',
      text: `Tant que vous tenez cette perche de 3m, vous pouvez consacrer votre action pour prononcer un mot de commande provoquant sa retractation en un sceptre de 30 cm de long, plus facile à ranger. Le poids de la perche ne change pas.<br>
      <br>
      Vous pouvez consacrer votre action à prononcer un mot de commande différent qui retransforme le sceptre en perche ; toutefois, l'objet ne s'allongera que dans les proportions permises par l'environnement. `
    },
    {
      title: 'Lunettes du Nyctalope',
      bottomLeft: 'Object Magique',
      image: '/goggles.svg',
      imageSize: '100px',
      text: `Tant que vous portez ces lentilles sombres, vous bénéficiez de la vision dans le noir dans un rayon de 18m. Si vous êtes déjà doté de la vision dans le noir, le port de ces lunettes en augmente la portée de 18m.`,
    },
    {
      title: 'Potion d\'Invisibilité',
      bottomLeft: 'Object Magique',
      bottomRight: 'Potion',
      image: '/potion.svg',
      imageSize: '100px',
      text: `Une fois cette potion bue, vous devenez invisible pendant une heure. Tous les vêtements, l'armure, les armes et l'équipement que vous portez sur vous deviennent également invisibles. L'effet prend fin prématurément si vous attaquez ou lancez un sort.`,
    },
    {
      title: 'Gantelets de Puissance d\'Ogre',
      bottomLeft: 'Object Magique',
      bottomRight: 'Gants',
      image: '/gauntlet.svg',
      imageSize: '100px',
      text: `Votre valeur de force s'élève à 19 tant que vous portez ces gantelets<br>
      <br>
      Ils n'ont aucun effet sur vous si votre valeur de force est déjà égale ou supérieure à 19`,
    },
    {
      title: 'Bottes de Marche et de Saut',
      bottomLeft: 'Object Magique',
      bottomRight: 'Bottes',
      image: '/boots.svg',
      imageSize: '100px',
      text: `Tant que vous portez ces bottes aux pieds, votre vitesse de déplacement au sol s'élève à 9 mètres, à moins qu'elle ne soit supérieure, et votre vitesse n'est pas réduite si vous êtes encombré ou si vous portez une armure lourde.<br>
      <br>
      En outre, la distance normale de vos sauts est multipliée par 3.`,
    }
  ]
  */
  /*
  const magicItems: CardProps[] = [
    {
      title: 'Pierre Messagère',
      bottomLeft: 'Object Magique',
      image: '/rune-stone.svg',
      imageSize: '75px',
      text: `Les pierres de communication à distance fonctionnent par paire, chacune de ces pierres lisses étant sculptée pour correspondre à sa pierre complémentaire.<br>
      <br>
      Tant que vous touchez une pierre, vous pouvez utiliser une action pour lancer le sort communication à distance grâce à elle. La cible du sort est le porteur de l'autre pierre. Si aucune créature ne porte l'autre pierre, vous en êtes averti dès que vous utilisez votre pierre, et le sort n'est pas lancé.<br>
      <br>
      Une fois que le sort communication à distance est lancé via les pierres, elles ne peuvent être réutilisées avant le prochain levé de soleil. Si l'une des pierres de la paire est détruite, l'autre pierre devient non magique.`,
    },
    {
      title: 'Pierre Messagère',
      bottomLeft: 'Object Magique',
      image: '/rune-stone.svg',
      imageSize: '75px',
      text: `Les pierres de communication à distance fonctionnent par paire, chacune de ces pierres lisses étant sculptée pour correspondre à sa pierre complémentaire.<br>
      <br>
      Tant que vous touchez une pierre, vous pouvez utiliser une action pour lancer le sort communication à distance grâce à elle. La cible du sort est le porteur de l'autre pierre. Si aucune créature ne porte l'autre pierre, vous en êtes averti dès que vous utilisez votre pierre, et le sort n'est pas lancé.<br>
      <br>
      Une fois que le sort communication à distance est lancé via les pierres, elles ne peuvent être réutilisées avant le prochain levé de soleil. Si l'une des pierres de la paire est détruite, l'autre pierre devient non magique.`,
    },
    {
      title: 'Parchemin de Boule de Feu',
      bottomLeft: 'Object Magique',
      bottomRight: 'Parchemin',
      image: '/scroll.svg',
      imageSize: '50px',
      text: `Un parchemin de sort contient les mots d'un seul sort, écrit dans un langage mystique. Si le sort est sur la liste de sorts de votre classe, vous pouvez lire le parchemin et lancer son sort sans avoir à fournir les composantes matérielles. Sinon, le parchemin est inintelligible. Lancer le sort en lisant le parchemin demande le temps d'incantation normal du sort. Une fois que le sort est lancé, les mots sur le parchemin disparaissent, et il tombe en poussière. Si l'incantation est interrompue, le parchemin n'est pas perdu.<br>
      <br>
      Si le sort est sur la liste des sorts de votre classe mais d'un niveau supérieur à celui que vous pouvez normalement lancer, vous devez effectuer un jet de caractéristique en utilisant votre caractéristique d'incantation pour déterminer si vous le lancez avec succès. Le DD est égal à 10 + le niveau du sort. Si le jet échoue, le sort disparaît du parchemin, sans autre effet.
      `
    },
    {
      title: 'Parchemin de Charme-Personne',
      bottomLeft: 'Object Magique',
      bottomRight: 'Parchemin',
      image: '/scroll.svg',
      imageSize: '50px',
      text: `Un parchemin de sort contient les mots d'un seul sort, écrit dans un langage mystique. Si le sort est sur la liste de sorts de votre classe, vous pouvez lire le parchemin et lancer son sort sans avoir à fournir les composantes matérielles. Sinon, le parchemin est inintelligible. Lancer le sort en lisant le parchemin demande le temps d'incantation normal du sort. Une fois que le sort est lancé, les mots sur le parchemin disparaissent, et il tombe en poussière. Si l'incantation est interrompue, le parchemin n'est pas perdu.<br>
      <br>
      Si le sort est sur la liste des sorts de votre classe mais d'un niveau supérieur à celui que vous pouvez normalement lancer, vous devez effectuer un jet de caractéristique en utilisant votre caractéristique d'incantation pour déterminer si vous le lancez avec succès. Le DD est égal à 10 + le niveau du sort. Si le jet échoue, le sort disparaît du parchemin, sans autre effet.
      `
    },
    {
      title: 'Parchemin d\'Augure',
      bottomLeft: 'Object Magique',
      bottomRight: 'Parchemin',
      image: '/scroll.svg',
      imageSize: '50px',
      text: `Un parchemin de sort contient les mots d'un seul sort, écrit dans un langage mystique. Si le sort est sur la liste de sorts de votre classe, vous pouvez lire le parchemin et lancer son sort sans avoir à fournir les composantes matérielles. Sinon, le parchemin est inintelligible. Lancer le sort en lisant le parchemin demande le temps d'incantation normal du sort. Une fois que le sort est lancé, les mots sur le parchemin disparaissent, et il tombe en poussière. Si l'incantation est interrompue, le parchemin n'est pas perdu.<br>
      <br>
      Si le sort est sur la liste des sorts de votre classe mais d'un niveau supérieur à celui que vous pouvez normalement lancer, vous devez effectuer un jet de caractéristique en utilisant votre caractéristique d'incantation pour déterminer si vous le lancez avec succès. Le DD est égal à 10 + le niveau du sort. Si le jet échoue, le sort disparaît du parchemin, sans autre effet.
      `
    },
    {
      title: 'Bouclier Expressif',
      bottomLeft: 'Object Magique',
      bottomRight: 'Bouclier',
      image: '/skull-shield.svg',
      imageSize: '100px',
      text: `Le devant de ce bouclier a la forme d'un visage. Lorsque vous portez le bouclier, vous pouvez utiliser une action bonus pour modifier l'expression des visages.<br>
      <br>
      • +1 supplémentaire à la classe d\'armure`
    },,
    {
      title: 'Statuette d \'Augure',
      bottomLeft: 'Object Magique',
      image: '/stone-bust.svg',
      imageSize: '100px',
      text: `Toute créature autre que mauvaise peut prendre la statuette et lui poser une question, à laquelle elle reçoit une réponse télépathique, comme si elle avait lancé le sort "Augure"<br>
      <br>
      Une fois qu'une créature a posé une question et reçu une réponse, elle ne peut plus jamais activer la statuette.<br>
      <br>
      Cette statuette en or a une valeur de 100po`
    },
  ]
  */

  /*
  const magicItems: CardProps[] = [
    {
      title: 'Amulette de Préservation',
      bottomLeft: 'Object Magique',
      bottomRight: 'Amulette',
      image: '/amulet.svg',
      imageSize: '70px',
      text: `Par une action, le porteur de cette amulette peut toucher une créature pour la transporter dans un demi-plan contenu dans le crystal de l'amulette. Le demi-plan est une salle de 20m2 entourée de murs de pierre. La créature ciblée peut choisir de renoncer à être transportée si elle réussi un jet de sauvegarde de sagesse (DD 10).<br>
      <br>
      Le porteur de cette amulette peut par une action libérer la créature contenue dans le demi-plan. Si la créature contenue dans le demi-plan cause des dégats suffisants aux murs du demi-plan, elle s'échappe, en brisant le crystal de l'amulette, ce qui la rend désormais inutilisable.<br>
      <br>
      Si la dernière créature à avoir été transportée par l'amulette tombe inconsciente dans un rayon de 20m autour du porteur, elle est de nouveau transportée automatiquement dans le demi-plan et est stabilisée.
      `,
    },
    {
      title: '"Tueuse de Dragons" (Épée Longue)',
      bottomLeft: 'Object Magique',
      bottomRight: 'Épée Longue',
      image: '/broadsword.svg',
      imageSize: '100px',
      text: `Si vous touchez un dragon avec cette arme, le dragon subit 3d6 dégâts supplémentaires.<br>
      <br>
      • +1 au jet d'attaque et de dégats`,
    },
    {
      title: 'Collier de Boules de Feu',
      bottomLeft: 'Object Magique',
      bottomRight: 'Amulette',
      image: '/pearl-necklace.svg',
      imageSize: '100px',
      text: `7 perles orangées sont enfilées sur ce collier.<br>
      <br>
      Vous pouvez consacrer votre action à détacher une perle pour la lancer à une distance maximale de 18m. Quand la perle arrive en fin de trajectoire, elle détone,
      produisant l'équivalent du sort de 3ème niveau <i>boule de feu</i> (DD de sauvegarde 15).<br>
      <br>
      Vous pouvez lancer plusieurs perles à la fois, voire l'intégralité du collier. Ce faisant, le niveau de la boule de feu augmente de 1 par perle au-delà de la première.`,
    },
    {
      title: 'Luth à Illusion',
      bottomLeft: 'Object Magique',
      image: '/luth.svg',
      imageSize: '100px',
      text: `Tant que vous jouez de ce luth magique, vous pouvez créer des illusions visuelles inoffensives dans une sphère de 1.5m de rayon. Si vous êtes barde,
      ce rayon passe à 4.5m.<br>
      <br>
      Ces effets magiques n'ont aucune substance et ne produisent aucun son, et leur nature illusoire ne fait aucun doute. Ils prennent fin dès que vous cessez de jouer.`,
    },
    {
      title: 'Baguette de Projectile Magique',
      bottomLeft: 'Object Magique',
      bottomRight: 'Baguette',
      image: '/wand.svg',
      imageSize: '100px',
      text: `Cette baguette contient 7 charges. En la tenant en main, vous pouvez utiliser une action pour dépenser entre 1 et 3 charges et lancer le sort <i>Projectile Magique</i> par son biais,
      sans avoir besoin de composante. Pour chaque autre charge que vous utilisez au-delà de la première, vous augmentez le niveau du sort de 1.<br>
      <br>
      Vous pouvez utiliser cette baguette même si vous n'êtes pas un lanceur de sorts.<br>
      <br>
      La baguette récupère 1d6+1 charges dépensées chaque jour à l'aube. Si vous dépensez la dernière charge de la baguette, lancez un d20. Sur un résultat de 1,
      elle tombe en cendres, détruite.`,
    },
    {
      title: '&nbsp&nbsp&nbsp&nbsp"Portelumière"&nbsp&nbsp&nbsp&nbsp (Masse d\'Armes)',
      bottomLeft: 'Object Magique',
      bottomRight: 'Masse d\'Armes',
      image: '/mace.svg',
      imageSize: '100px',
      text: `Cette masse d'armes a été conçue pour un prêtre du <i>Père de l'Aube</i>. Sa tête est forgée en forme de soleil levant et est faite de laiton robuste.<br>
      <br>
      Elle se nomme <i>Portelumière</i> et brille aussi fort qu'une torche quand son détenteur le lui demande. Quand elle brille, elle inflige 1d6 dégâts radiants supplémentaires aux morts-vivants.<br>
      <br>
      • +1 au jet d'attaque et de dégats`,
    },
    {
      title: '"Contredragon" (Cuirasse)',
      bottomLeft: 'Object Magique',
      bottomRight: 'Cuirasse',
      image: '/armor.svg',
      imageSize: '100px',
      text: `Cette <i>cuirasse</i> +1 est ornée d'un dragon doré.<br>
      <br>
      Le porteur de cette cuirasse est avantagé sur les jets de sauvegarde contre le souffle des créatures de type dragon.`,
    },
    {
      title: 'Bâton de l\'Araignée',
      bottomLeft: 'Object Magique',
      bottomRight: 'Bâton',
      image: '/spider-staff.svg',
      imageSize: '70px',
      text: `L'extrémité de ce bâton noir en adamantium a la forme d'une araignée. Vous devez vous harmoniser avec lui pour bénéficier de ses avantages et lancer ses sorts.<br>
      <br>
      Le bâton peut être manié comme l'arme du même nom. Il inflige 1d6 dégâts de dégâts de poison supplémentaires en cas d'attaque réussie.<br>
      <br>
      Le bâton contient 10 charges utilisables pour lancer les sorts qu'il contient, si ce sort fait partie de la liste de sort de votre classe :<br>
      <br>
      • pattes d'araignée (1 charge),<br>
      • toile d'araignée (2 charges, DD 15),<br>
      <br>
      Le bâton récupère 1d6+4 charges dépensées chaque jour au crépuscule. Si vous dépensez la dernière charge du bâton, lancez un d20. Sur un résultat de 1,
      il tombe en cendres, détruit.
      `,
    },
    {
      title: 'Heaume Effrayant',
      bottomLeft: 'Object Magique',
      bottomRight: 'Casque',
      image: '/helmet.svg',
      imageSize: '100px',
      text: `Vos yeux luisent d'un rouge intense lorsque vous portez cet effroyable heaume d'acier`,
    },
  ]
  */

  const magicItems: CardProps[] = [
    {
      title: '"Serre" (Épée à deux mains)',
      bottomLeft: 'Object Magique',
      bottomRight: 'Épée à deux mains',
      image: '/broadsword.svg',
      imageSize: '100px',
      text: `Le nom de l'épée "Serre" est gravé sur la lame, et sa garde est sculptée en forme d'oiseau de proie aux ailes déployées.<br>
      <br>
      • 2d6 tranchant<br>
      • Lourde, à deux mains<br>
      • +1 au jet d'attaque et de dégats`
    },
    {
      title: '"Tueuse de Dragons" (Épée Longue)',
      bottomLeft: 'Object Magique',
      bottomRight: 'Épée Longue',
      image: '/broadsword.svg',
      imageSize: '100px',
      text: `Si vous touchez un dragon avec cette arme, le dragon subit 3d6 dégâts supplémentaires.<br>
      <br>
      • 1d8 tranchant<br>
      • Polyvalente (1d10)<br>
      • +1 au jet d'attaque et de dégats`,
    },
    {
      title: '&nbsp&nbsp&nbsp&nbsp"Portelumière"&nbsp&nbsp&nbsp&nbsp (Masse d\'Armes)',
      bottomLeft: 'Object Magique',
      bottomRight: 'Masse d\'Armes',
      image: '/mace.svg',
      imageSize: '100px',
      text: `Cette masse d'armes a été conçue pour un prêtre du <i>Père de l'Aube</i>. Sa tête est forgée en forme de soleil levant et est faite de laiton robuste.<br>
      <br>
      Elle se nomme <i>Portelumière</i> et brille aussi fort qu'une torche quand son détenteur le lui demande. Quand elle brille, elle inflige 1d6 dégâts radiants supplémentaires aux morts-vivants.<br>
      <br>
      • 1d6 contondant<br>
      • +1 au jet d'attaque et de dégats`,
    },
    {
      title: '"Contredragon" (Cuirasse)',
      bottomLeft: 'Object Magique',
      bottomRight: 'Cuirasse',
      image: '/armor.svg',
      imageSize: '100px',
      text: `Cette cuirasse +1 est ornée d'un dragon doré.<br><br>
      Le porteur de cette cuirasse est avantagé sur les jets de sauvegarde contre le souffle des créatures de type dragon.
      <br><br>
      • CA 14 + 1 + Mod.Dex (max +2)<br>
      `,
    },
    {
      title: '"Langue de Vipère" (Épée courte)',
      bottomLeft: 'Object Magique',
      bottomRight: 'Épée courte',
      image: '/gladius.svg',
      imageSize: '100px',
      text: `Le pommeau de cette épée courte est gravée dans un bronze à la forme d'une tête de vipère<br>
      <br>
      Le porteur de cette épée est avantagé aux tests de Persuasion et de Tromperie.<br><br>
      • 1d6 perforant<br>
      • Finesse, légère<br>
      • +1 au jet d'attaque et de dégats`,
    },
  ]

  /*
  const testCards: CardProps[] = [
    {
      title: 'Test',
      text: `This is a test`,
      bottomLeft: 'Bottom Left',
      bottomRight: 'Bottom Right',
    },
    {
      title: 'Test',
      keyValueFirstLine: ['OneKey', 'OneValue', 'TwoWkey', 'TwoValue'],
      text: `This is a test`,
    },
    {
      title: 'Test',
      keyValueFirstLine: ['OneKey', 'OneValue', 'TwoWkey', 'TwoValue'],
      keyValueSecondLine: ['OneKey', 'OneValue', 'TwoWkey', 'TwoValue'],
      text: `This is a test`,
    },
    {
      title: 'Test',
      text: `This is a test`,
    },
    {
      title: 'Test',
      text: `This is a test`,
    }
  ]
  */

  const testCards: CardProps[] = []
  for (var spell of cards) {

    const regex = /^\(.*?\) /g
    const match = regex.test(spell.text)
    const materials = match ? spell.text.match(regex)?.[0].slice(1,-2) : undefined
    const text = match ? spell.text.replace(regex, '') : spell.text
    const regexFollowUp = /\([^1]\/\d\)/g
    const skipHeader = regexFollowUp.test(spell.name)

    testCards.push({
      title: spell.name,
      text: text,
      separatorText: materials,
      keyValueFirstLine: skipHeader ? undefined : [
        'Incantation', spell.incantation,
        'Portée', spell.reach
      ],
      keyValueSecondLine: skipHeader ? undefined : [
        'Composantes', spell.components,
        'Durée', spell.duration
      ],
      bottomLeft: spell.class,
      bottomRight: spell.type,
      color: '#1c71d8',
    })
  }
  // 1c71d8
  // 00791c
  // faa035

  return (
    <div className="cardlist">
      {magicItems.map((value, index) => (
        <Card
          key={index}
          title={value.title}
          keyValueFirstLine={value.keyValueFirstLine}
          keyValueSecondLine={value.keyValueSecondLine}
          separatorText={value.separatorText}
          text={value.text}
          bottomLeft={value.bottomLeft}
          bottomRight={value.bottomRight}
          image={value.image}
          imageSize={value.imageSize}
          color={value.color}
        />
      ))}
    </div>
  )
}