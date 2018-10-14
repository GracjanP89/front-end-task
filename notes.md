Zadanie wykonałem obiektowo. Utworzyłem specjalny obiekt Products , przyjmujący dane które modyfikuje dzięki swoim metodom.
Do przechowywania danych między przeładowaniami stron wykorzystałem technologię localStorage która wg. mnie świetnie do tego się nadaje, ( wspracie przeglądarek w stosunku do tej technologii jest dobre).

Jeśli chodzi o kompatybilność wsteczną projektu ( projekt jest tworzony bez użycia żadnych bibliotek czy frameworków typu jQuery,Angulat etc.),
wsparcie przeglądarek, IE8+ , pozostałe główne przeglądarki ( Opera, Firefox , Chrome ) , w 100% wspierają wykorzystane rozwiązania. ('Jeśli chodzi o Safari z racji nie posiadania odpowiedniego sprzętu , testy były utrudnione').

Do testów funkcjonalności sortowania i filtrowania użyłem narzędzia Jasmine
komenda startująca testy : npm test
