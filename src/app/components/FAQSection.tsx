"use client";

import React, { useState } from "react";
import { MdExpandMore } from "react-icons/md";

const FAQItem = ({
  question,
  answer,
  paragraphs,
}: {
  question: string;
  answer?: string;
  paragraphs?: string[];
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const renderContent = () => {
    if (paragraphs) {
      return paragraphs.map((paragraph, index) => (
        <p key={index} className="text-gray-300 mb-4 last:mb-0">
          {paragraph}
        </p>
      ));
    }
    
    // Fallback to answer with split
    const parts = answer?.split('\n\n') || [answer || ''];
    return parts.map((paragraph, index) => (
      <p key={index} className="text-gray-300 mb-4 last:mb-0">
        {paragraph.trim()}
      </p>
    ));
  };

  return (
    <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-sm border border-purple-500/20 rounded-xl overflow-hidden">
      <button
        className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-purple-500/10 transition-colors duration-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-semibold text-white pr-4">{question}</h3>
        <MdExpandMore
          className={`text-purple-400 text-2xl transition-transform duration-200 flex-shrink-0 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="px-6 pb-4">
          <div className="text-gray-300 leading-relaxed">
            {renderContent()}
          </div>
        </div>
      )}
    </div>
  );
};

const FAQSection = () => {
  return (
    <section className="flex flex-col items-center py-20 bg-gradient-to-b from-[#280432] to-[#1a0220]">
      <div className="text-center mb-16 max-w-3xl px-4">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
          Często zadawane pytania o gry imprezowe Drinkify
        </h2>
        <p className="text-lg text-gray-300 leading-relaxed">
          Znajdź szczegółowe odpowiedzi na najczęściej zadawane pytania o nasze interaktywne gry imprezowe. 
          Dowiedz się wszystkiego o dostępie, funkcjonalnościach i możliwościach naszych mobilnych kart do zabawy.
        </p>
      </div>
      <div className="w-full max-w-4xl px-4">
        <div className="space-y-4">
          <FAQItem
            question="Jak działa dostęp do gier imprezowych po zakupie?"
            paragraphs={[
              "Po pomyślnym zakupie gry imprezowej w naszym sklepie, natychmiastowo otrzymasz dostęp do zakupionej gry w zakładce 'Moje gry' na swoim koncie użytkownika. Nie musisz czekać na email ani pobierać żadnych plików - po zalogowaniu się na swoje konto, wszystkie zakupione gry będą dostępne w dedykowanej sekcji.",
              "Możesz grać na dowolnym urządzeniu z dostępem do internetu i przeglądarki internetowej - telefonie, tablecie, laptopie czy komputerze stacjonarnym. Gry są w pełni responsywne i automatycznie dostosowują się do rozmiaru ekranu, zapewniając komfortową rozgrywkę niezależnie od używanego urządzenia."
            ]}
          />
          <FAQItem
            question="Czy mogę grać w gry imprezowe Drinkify bez połączenia z internetem?"
            paragraphs={[
              "Nasze gry imprezowe wymagają stabilnego połączenia z internetem podczas rozgrywki. Dzięki temu możemy zapewnić najlepsze doświadczenie użytkownika, dostęp do najnowszych wersji gier oraz wszystkich funkcjonalności premium.",
              "Internetowe gry gwarantują również synchronizację między urządzeniami, jeśli gracze korzystają z różnych telefonów czy tabletów podczas jednej rozgrywki. Dodatkowo, dzięki stałemu połączeniu z naszymi serwerami, możemy wprowadzać aktualizacje, nowe karty i treści bez konieczności pobierania dodatkowych plików.",
              "Wszystkie nasze gry są zoptymalizowane pod kątem niskiego zużycia danych mobilnych, więc nie musisz się martwić o przekroczenie limitu internetu w telefonie."
            ]}
          />
          <FAQItem
            question="Dla ilu graczy są przeznaczone gry imprezowe Drinkify?"
            paragraphs={[
              "Większość naszych gier imprezowych jest elastycznie zaprojektowana dla grup od 2 do 12+ osób, choć optymalna liczba graczy różni się w zależności od konkretnej gry. W opisie każdej gry w naszym sklepie znajdziesz dokładną informację o zalecanej i maksymalnej liczbie uczestników.",
              "Gry dla mniejszych grup (2-4 osoby) koncentrują się na bardziej intymnych i strategicznych wyzwaniach, podczas gdy gry dla większych grup (6-12+ osób) oferują dynamiczną zabawę i większe możliwości interakcji społecznych.",
              "Pamiętaj, że im więcej osób bierze udział w grze, tym więcej śmiechu, niespodzianek i niezapomnianych momentów możecie wspólnie przeżyć. Niektóre nasze gry pozwalają nawet na rozgrywkę w większych grupach poprzez podział na zespoły."
            ]}
          />
          <FAQItem
            question="Czy gry imprezowe Drinkify są odpowiednie dla wszystkich grup wiekowych?"
            paragraphs={[
              "Nasze gry imprezowe są przeznaczone głównie dla osób dorosłych (18+) i młodzieży powyżej 16 roku życia w towarzystwie dorosłych. Zawierają treści imprezowe o charakterze rozrywkowym, które najlepiej sprawdzają się w gronie przyjaciół podczas domówek, imprez urodzinowych, wieczorów panieńskich i kawalerskich oraz innych okazji towarzyskich.",
              "Pytania i wyzwania w naszych grach mogą dotyczyć tematów związanych z życiem dorosłych, relacjami interpersonalnymi i sytuacjami, które wymagają pewnej dojrzałości życiowej.",
              "Przed zakupem zalecamy zapoznanie się z opisem konkretnej gry oraz przykładowymi pytaniami, aby upewnić się, że treść jest odpowiednia dla Twojej grupy. Wszystkie nasze gry promują pozytywną zabawę i budowanie więzi między uczestnikami."
            ]}
          />
          <FAQItem
            question="Co robić w przypadku problemów technicznych z grami?"
            paragraphs={[
              "Nasz zespół wsparcia technicznego jest zawsze gotowy, aby pomóc w rozwiązaniu wszelkich problemów z dostępem lub funkcjonowaniem gier. Jeśli napotkasz trudności z zalogowaniem się do konta, dostępem do zakładki 'Moje gry', problemami z wyświetlaniem treści lub jakimikolwiek innymi kwestiami technicznymi, skontaktuj się z nami przez formularz kontaktowy dostępny na naszej stronie lub wyślij email bezpośrednio na nasz adres wsparcia.",
              "Odpowiadamy na wszystkie zapytania w ciągu 24 godzin w dni robocze, a w przypadku pilnych problemów staramy się reagować jeszcze szybciej.",
              "Przed skontaktowaniem się z obsługą, sprawdź czy masz stabilne połączenie z internetem i czy używasz aktualnej wersji przeglądarki internetowej. Większość problemów technicznych można rozwiązać poprzez odświeżenie strony lub wyczyszczenie cache przeglądarki."
            ]}
          />
          <FAQItem
            question="Czy mogę zwrócić zakupioną grę imprezową lub otrzymać zwrot pieniędzy?"
            paragraphs={[
              "Ze względu na cyfrowy charakter naszych produktów, standardowo nie oferujemy zwrotów pieniędzy po uzyskaniu dostępu do gry w zakładce 'Moje gry'. Jest to związane z natychmiastowym udostępnieniem pełnej treści gry po zakupie.",
              "Jednak rozumiemy, że czasami mogą wystąpić sytuacje wyjątkowe - jeśli masz problemy z dostępem do zakupionej gry, gra nie działa zgodnie z opisem, lub wystąpiły inne istotne problemy techniczne uniemożliwiające korzystanie z produktu, koniecznie skontaktuj się z naszym zespołem obsługi klienta.",
              "Każdy przypadek rozpatrujemy indywidualnie i staramy się znaleźć satysfakcjonujące rozwiązanie. Naszym priorytetem jest zadowolenie klientów, dlatego zawsze postaramy się pomóc, czy to poprzez wsparcie techniczne, wymianę produktu, czy inne rozwiązanie dostosowane do Twojej sytuacji."
            ]}
          />
          <FAQItem
            question="Jak długo mam dostęp do zakupionych gier imprezowych?"
            paragraphs={[
              "Po zakupie gry w Drinkify otrzymujesz dożywotni dostęp do zakupionego produktu. Oznacza to, że Twoja gra będzie dostępna w zakładce 'Moje gry' bez ograniczeń czasowych - możesz korzystać z niej za miesiąc, rok czy nawet kilka lat po zakupie. Nie pobieramy żadnych opłat abonamentowych ani dodatkowych płatności za przedłużenie dostępu.",
              "Dodatkowo, jeśli wprowadzamy aktualizacje, nowe karty lub usprawnienia do gier, które już posiadasz, automatycznie otrzymujesz dostęp do najnowszych wersji bez dodatkowych kosztów.",
              "Jedynym wymogiem jest posiadanie aktywnego konta w naszym serwisie oraz dostęp do internetu podczas rozgrywki. Zachowaj dane logowania do swojego konta, aby zawsze móc skorzystać z zakupionych gier w dowolnym momencie."
            ]}
          />
          <FAQItem
            question="Czy mogę udostępnić zakupione gry innym osobom?"
            paragraphs={[
              "Gry zakupione w Drinkify są licencjonowane na użytek osobisty dla właściciela konta. Oznacza to, że możesz grać w zakupione gry ze swoimi przyjaciółmi, rodziną i gośćmi podczas wspólnych spotkań i imprez - to jest dokładnie zgodne z przeznaczeniem naszych produktów.",
              "Jednak nie możesz udostępniać danych logowania do swojego konta innym osobom ani odsprzedawać dostępu do gier. Każda osoba, która chce mieć własny dostęp do gier Drinkify, powinna założyć własne konto i dokonać zakupu.",
              "Takie podejście pozwala nam utrzymać wysoką jakość usług, zapewnić bezpieczeństwo danych użytkowników oraz finansować dalszy rozwój nowych gier i funkcjonalności. Jeśli organizujesz większe wydarzenia i potrzebujesz licencji komercyjnych, skontaktuj się z nami - oferujemy specjalne rozwiązania dla firm i organizatorów eventów."
            ]}
          />
        </div>
      </div>
    </section>
  );
};

export default FAQSection;