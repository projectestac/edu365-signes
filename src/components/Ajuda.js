import React from 'react';

import ChromeInstall from '../assets/chrome-install.png';
import InstallButton from '../assets/install-button.png';
import PwaIos from '../assets/pwa-ios.png';

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
        o classificacions. Aquestes, a la vegada, s'estructuren en famílies.
      </p>
      <p className="bold">
        A cada paraula hi trobareu:
      </p>
      <ul>
        <li>Un o més vídeos de la paraula representada en el llenguatge de signes català.</li>
        <li>Un dibuix de la paraula</li>
        <li>El so amb veu de la paraula</li>
      </ul>
      <p className="bold">
        Està destinat a:
      </p>
      <ul>
        <li>Nenes i nens que utilitzen els signes manuals com a suport de comunicació.</li>
        <li>Nenes i nens sords que necessitin aprendre la llengua de signes.</li>
        <li>Professorat d'EE i logopedes.</li>
        <li>Pares, mares i tutors.</li>
      </ul>
      <h2>Cercar una paraula</h2>
      <p>
        En primer lloc, haureu de seleccionar la classificació que desitgeu com a criteri de cerca.
        En cas que vulgueu cercar a totes les paraules del diccionari, deixeu seleccionada l'opció
        "TOTES LES CLASSIFICACIONS".
      </p>
      <p>
        A continuació es farà el mateix amb les famílies, seleccionant la família desitjada per
        tal de concretar els criteris de cerca.
      </p>
      <p>
        Quan s'escrigui la primera lletra en el quadre de cerca, automàticament es posicionarà en la
        llista de paraules, activant la paraula que s'està intentant cercar només escrivint alguna de
        les lletres que contingui. Així si per exemple quan s'escrigui la lletra "A", el sistema es
        posicionarà en la primera paraula que contingui una "A", si continuem escrivint "AS" es
        posicionarà en la primera paraula que contingui "AS", i així fins que escrivim tota la paraula o
        fins que trobem la paraula que cercàvem. Fent clic a la paraula o prement la tecla ENTER
        es mostrarà la informació associada a la paraula escollida.
      </p>
      <p>
        També es pot seleccionar la paraula directament de la llista de paraules, polsant amb el ratolí sobre
        la paraula o desplaçant-se amb el cursor mitjançant el teclat.
      </p>
      <p>
        Un cop hàgiu seleccionat una paraula, apareixerà en pantalla:
      </p>
      <ul>
        <li className="bold">La paraula.</li>
        <li>
          <span className="bold">El vídeo de la paraula representada en llenguatge de signes.</span> En
          cas que existeixi més d'un vídeo per a aquella paraula, apareixerà una llista mostrant les variants disponibles.
        </li>
        <li className="bold">Una imatge de la paraula.</li>
        <li>
          <span className="bold">El so de la paraula parlada</span>, que podrem tornar a escoltar polsant el botó "Torna a dir-ho".
        </li>
      </ul>
      <h2>Treballar en la modalitat "Recordem"</h2>
      <p>
        El "Mira Què Dic!" té dues modalitats de treball:
      </p>
      <ul>
        <li>
          La modalitat <span className="bold">Diccionari</span>, que permet consultar paraules
          mostrant tota la informació multimèdia que tinguin associada.
        </li>
        <li>
          La modalitat <span className="bold">Recordem</span>, que planteja a l'alumne el repte d'endevinar una paraula a partir de la
          seva representació en llenguatge de signes. La paraula pot sorgir a l'atzar, fent clic en el botó que mostra un dau, o bé
          pot ser escrita per l'educador. En qualsevol dels dos casos, només veurem el nombre de caràcters que formen la paraula, que queda
          amagada com si fos una contrasenya, i un vídeo amb la seva representació en llenguatge de signes. L'alumne/a ha d'endevinar la paraula
          amagada. Si no la coneix, pot demanar fins a tres pistes: el so, la imatge o el text. Quan estigui segur d'haver-la encertat,
          l'ha d'escriure a la caixa de text i fer clic al botó "Comprova-ho".
        </li>
      </ul>
      <h2>Instal·lació de l'aplicació</h2>
      <p>
        El "Mira què dic!" es pot utilitzar directament des de la web i també es pot instal·lar com a aplicació independent en ordinadors,
        tauletes i dispositius mòbils.
      </p>
      <p>
        Els principals avantatges d'instal·lar-lo com a aplicació independent són:
      </p>
      <ul>
        <li>L'aplicació <span className="bold">s'engega més de pressa</span>, directament a partir d'una icona al mòbil o al menú "Inici" de l'ordinador.</li>
        <li>S'eliminen <span className="bold">elements distractors</span> com ara els menús, botons i barres del navegador web: l'aplicació ocupa tota la pantalla,
          aprofitant al màxim l'espai dels dispositius mòbils.</li>
        <li>Ocasionalment, l'aplicació <span className="bold">pot funcionar sense connexió a Internet</span>. Els vídeos, imatges i sons de les darreres 100 paraules
          vistes es conserven al dispositiu per poder seguir treballant-les quan es trobi fora de línia.</li>
      </ul>
      <p>
        Per instal·lar l'aplicació al vostre dispositiu només cal que visiteu la <a href="https://mqdic.edigital.cat/">pàgina principal</a> amb
        el navegador web i seguiu les instruccions següents:
      </p>
      <ul>
        <li>
          En sistemes <span className="bold">Android</span>, <span className="bold">Windows</span> i <span className="bold">Linux</span>: feu clic al botó "Instal·la l'aplicació"
          que surt a la pantalla d'inici. Us apareixerà una finestra de diàleg on us preguntaran si voleu continuar. Confirmeu-ho i disposareu de la icona per engegar-la
          a l'escriptori o al menú d'inici.
          <img
            className='imatge-ajuda'
            src={InstallButton}
            alt="Botó d'instal·lació de l'aplicació"
          ></img>
          Amb el navegador Chrome també podeu utilitzar la icona d'instal·lació que hi ha a la dreta de la barra d'adreces:
          <img
            className='imatge-ajuda'
            src={ChromeInstall}
            alt="Icona d'instal·lació a Google Chrome"
          ></img>
        </li>
        <li>
          En sistemes <span className="bold">Apple iOS</span> (iPhone i iPad) heu d'utilitzar el navegador Safari per visitar la pàgina principal (no funciona amb altres navegadors).
          Feu clic al botó "Comparteix" que hi ha a la part inferior de la pantalla i, tot seguit, seleccioneu l'opció
          "Afegeix a l'escriptori" per tal que aparegui la icona de l'aplicació a la pantalla del mòbil o la tauleta.
          <img
            className='imatge-ajuda'
            src={PwaIos}
            alt="Captures de pantalla one s mostra la instal·lació en sistemes iOS"
          ></img>
        </li>
      </ul>
      <p>
        L'aplicació es pot desinstal·lar en qualsevol moment des del gestor de programari del dispositiu.
      </p>
      <h2>Vegeu també...</h2>
      <p>
        La llista de totes les paraules incloses en l'aplicació, així com la relació completa d'imatges, sons i vídeos es pot consultar
        en <a href="https://docs.google.com/spreadsheets/d/1lKUyOrmFfTzWKyLfTNXI4sLX2d-e9ONCyMBFGGi9zxY/edit?usp=sharing" target="_blank">aquest
          document en línia</a>.
      </p>
      <p>
        L'aplicació <span className="bold">Mira Què Dic</span> és un projecte de programari lliure distribuït sota els termes de
        la <a href="https://eupl.eu/1.2/en/" target="_blank">Llicència Pública de la Unió Europea v. 1.2</a>. El codi font de l'aplicació,
        juntament amb tots els mitjans multimèdia utilitzats, es troba disponible
        a: <a href="https://github.com/projectestac/edu365-signes" target="_blank">https://github.com/projectestac/edu365-signes</a>.
      </p>
    </div>
  );
}

export default Ajuda;
