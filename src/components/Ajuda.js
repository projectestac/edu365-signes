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
        imatge, so i text, creat per especialistes d’audició i llenguatge del CEE Les Aigües de Mataró i que
        utilitza la llengua de signes catalana. Està supervisat per l’Institut de Llengua de Signes de Catalunya
        (ILLESCAT). El Departament d’Educació de la Generalitat de Catalunya ha col·laborat en la seva
        publicació i difusió. Aquest diccionari consta de 3.612 paraules que es poden consultar per
        ordre alfabètic o realitzant la cerca en diferents camps semàntics i categories gramaticals.
      </p>
      <p className="bold">
        A cada paraula hi trobareu:
      </p>
      <ul>
        <li>Un o més vídeos de la paraula representada en llengua de signes catalana.</li>
        <li>La imatge de la paraula</li>
        <li>La producció oral de la paraula</li>
      </ul>
      <p className="bold">
        Està destinat a:
      </p>
      <ul>
        <li>Usuaris que utilitzen els signes manuals com a suport alternatiu i/o augmentatiu de comunicació.</li>
        <li>Comunitat educativa i famílies.</li>
      </ul>
      <h2>Cercar una paraula</h2>
      <p>
        En cas que es vulgui cercar qualsevol paraula del diccionari, s’hauria de deixar seleccionada
        l’opció “TOTES LES CLASSIFICACIONS” i escriure la paraula en el requadre corresponent.
      </p>
      <p>
        En cas que es vulgui concretar la cerca d’un camp semàntic o categoria gramatical, s’hauria de
        desplegar el menú de “TOTES LES FAMÍLIES” i seleccionar aquella que ens interessa.
      </p>
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
          amagada com si fos una contrasenya, i un vídeo amb la seva representació en llengua de signes. L'usuari ha d'endevinar la paraula
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
          En Linkat i altres sistemes Linux, un cop instal·lada l'aplicació cal fer clic amb el botó dret a la icona que apareix a l'escriptori i
          fer clic a l'opció "Permet que s'iniciï".
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
      <h2>Programari lliure</h2>
      <p>
        L'aplicació <span className="bold">Mira Què Dic</span> és un projecte de programari lliure distribuït sota els termes de
        la <a href="https://eupl.eu/1.2/en/" target="_blank" rel="noreferrer">Llicència Pública de la Unió Europea v. 1.2</a>.
      </p>
      <p>
        El codi font de l'aplicació, juntament amb tots els mitjans multimèdia utilitzats, es troba disponible a:<br />
        <a href="https://github.com/projectestac/edu365-signes" target="_blank" rel="noreferrer">https://github.com/projectestac/edu365-signes</a>.
      </p>
    </div>
  );
}

export default Ajuda;
