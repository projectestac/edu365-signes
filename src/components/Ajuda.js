import React from 'react';

function Ajuda() {
  return (
    <div className="ajuda">
      <h2>Introducció</h2>
      <p>
        <span className="bold">Mira Què Dic</span> és un diccionari interactiu multimèdia amb suport de vídeo,
        imatge, so i text, que utilitza la Llengua de Signes de Catalunya, supervisat per l'Institut de Llenguatge
        de Signes de Catalunya (ILLESCAT) i en col·laboració amb el departament d'Educació de la
        Generalitat de Catalunya.
      </p>
      <p>
        El vocabulari es pot consultar per ordre alfabètic o estructurat en diferents camps semàntics
        o classificacions, on aquests, a la vegada s’estructuren en famílies.
      </p>
      <p className="bold">
        A cada paraula hi trobareu:
      </p>
      <ul>
        <li>1 o més vídeos de la paraula representat en el llenguatge dels signes.</li>
        <li>1 dibuix de la paraula</li>
        <li>1 so (veu) de la paraula</li>
      </ul>
      <p className="bold">
        Està destinat a:
      </p>
      <ul>
        <li>Nenes i nens que utilitzen els signes manuals com a suport de comunicació.</li>
        <li>Nenes i nens sords que necessitin aprendre la Llengua de Signes.</li>
        <li>Professorat d'EE i logopedes.</li>
        <li>Pares, mares i tutors.</li>
      </ul>
      <h2>Cercar una paraula</h2>
      <p>
        En primer lloc s’haurà de seleccionar la classificació que desitja com a criteri de cerca.
        En el cas que es vulgui cercar en totes les paraules del diccionari, és seleccionarà l’opció
        "TOTES LES CLASSIFICACIONS".
      </p>
      <p>
        A continuació es farà el mateix amb les famílies, es seleccionarà la família desitjada per
        concretar els criteris de cerca.
      </p>
      <p>
        Quan s’escrigui la primera lletra en el quadre de cerca, automàticament es posicionarà en la
        llista de paraules, activant la paraula que s’està intentant cercar només escrivint alguna de
        les lletres que contingui. Així si per exemple quan s’escrigui la lletra "A", el sistema es
        posicionarà en la primera paraula que contingui una "A", si continuem escrivint "AS" es
        posicionarà en la primera paraula que contingui "AS", i així fins que escrivim tota la paraula o
        si la paraula que s’ha seleccionat es la que cercàvem. Fent clic en la paraula o prement la tecla ENTER
        ens mostrarà la informació de la paraula.
      </p>
      <p>
        També es pot seleccionar la paraula directament de la llista de paraules, polsant amb el ratolí sobre
        la paraula o desplaçant-se amb el cursos del teclat.
      </p>
      <p>
        Un cop s’ha seleccionat una paraula apareixerà en pantalla:
      </p>
      <ul>
        <li className="bold">La paraula.</li>
        <li>
          <span className="bold">El vídeo de la paraula representada en llenguatge de signes.</span>
          En cas que existeixi mes d’un vídeo per aquella paraula, apareixerà una llista a sota del
          vídeo mostrant les variants disponibles.
        </li>
        <li className="bold">Una imatge de la paraula.</li>
        <li>
          <span className="bold">El So de la paraula parlada</span>, que podrem tornar a escoltar polsant el botó "Torna a dir-ho".
        </li>
      </ul>
      <h2>Treballar en modalitat "Recordem"</h2>
      <p>
        Mira Què Dic té dues modalitats de treball:
      </p>
      <ul>
        <li>
          La modalitat <span className="bold">Diccionari</span> que és amb la que inicia el programa. Permet consultar paraules
          mostrant tota la informació multimèdia.
        </li>
        <li>
          La modalitat <span classname="bold">Recordem</span>. La funcionalitat d’aquesta modalitat és avaluar a l’alumne. Mostra només
          el vídeo de la paraula i l’alumne ha d’esbrinar de quina paraula es tracta. També pot donar pistes a l'alumne per ajudar-lo
          a esbrinar la paraula, activant el text, el so i/o la imatge polsant sobre els botons que apareixen a sobre del elements que
          volem mostrar.
        </li>
      </ul>
    </div>
  );
}

export default Ajuda;
