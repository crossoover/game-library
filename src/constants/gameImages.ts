import americanRouletteImg from "../assets/games/american-roulette.jpg";
import baccaratProImg from "../assets/games/baccarat-pro.jpg";
import bingoBlastImg from "../assets/games/bingo-blast.jpg";
import bingoBonanzaImg from "../assets/games/bingo-bonanza.jpg";
import blackjackClassicImg from "../assets/games/blackjack-classic.jpg";
import blackjackMultiHandImg from "../assets/games/blackjack-multi-hand.jpg";
import bonanzaImg from "../assets/games/bonanza.jpg";
import bookOfDeadImg from "../assets/games/book-of-dead.jpg";
import cashScratchImg from "../assets/games/cash-scratch.jpg";
import casinoHoldemImg from "../assets/games/casino-holdem.jpg";
import dreamCatcherImg from "../assets/games/dream-catcher.jpg";
import europeanRouletteImg from "../assets/games/european-roulette.jpg";
import gonzosQuestImg from "../assets/games/gonzos-quest.jpg";
import instantWinImg from "../assets/games/instant-win.jpg";
import kenoImg from "../assets/games/keno.jpg";
import lightningRouletteImg from "../assets/games/lightning-roulette.jpg";
import liveBaccaratImg from "../assets/games/live-baccarat.jpg";
import liveBlackjackImg from "../assets/games/live-blackjack.jpg";
import liveCasinoHoldemImg from "../assets/games/live-casino-holdem.jpg";
import liveRouletteImg from "../assets/games/live-roulette.jpg";
import megaMoolahImg from "../assets/games/mega-moolah.jpg";
import monopolyLiveImg from "../assets/games/monopoly-live.jpg";
import scratchCardsImg from "../assets/games/scratch-cards.jpg";
import starburstImg from "../assets/games/starburst.jpg";
import superKenoImg from "../assets/games/super-keno.jpg";
import threeCardPokerImg from "../assets/games/three-card-poker.jpg";
import twinSpinImg from "../assets/games/twin-spin.jpg";
import wolfGoldImg from "../assets/games/wolf-gold.jpg";

export const GAME_IMAGES: Record<string, string> = {
  "american-roulette": americanRouletteImg,
  "baccarat-pro": baccaratProImg,
  "bingo-blast": bingoBlastImg,
  "bingo-bonanza": bingoBonanzaImg,
  "blackjack-classic": blackjackClassicImg,
  "blackjack-multi-hand": blackjackMultiHandImg,
  bonanza: bonanzaImg,
  "book-of-dead": bookOfDeadImg,
  "cash-scratch": cashScratchImg,
  "casino-holdem": casinoHoldemImg,
  "dream-catcher": dreamCatcherImg,
  "european-roulette": europeanRouletteImg,
  "gonzos-quest": gonzosQuestImg,
  "instant-win": instantWinImg,
  keno: kenoImg,
  "lightning-roulette": lightningRouletteImg,
  "live-baccarat": liveBaccaratImg,
  "live-blackjack": liveBlackjackImg,
  "live-casino-holdem": liveCasinoHoldemImg,
  "live-roulette": liveRouletteImg,
  "mega-moolah": megaMoolahImg,
  "monopoly-live": monopolyLiveImg,
  "scratch-cards": scratchCardsImg,
  starburst: starburstImg,
  "super-keno": superKenoImg,
  "three-card-poker": threeCardPokerImg,
  "twin-spin": twinSpinImg,
  "wolf-gold": wolfGoldImg,
};

export const ALL_GAME_IMAGES = Object.values(GAME_IMAGES);

export const getGameImage = (slug?: string): string => {
  if (slug && GAME_IMAGES[slug]) {
    return GAME_IMAGES[slug];
  }

  const randomIndex = Math.floor(Math.random() * ALL_GAME_IMAGES.length);
  return ALL_GAME_IMAGES[randomIndex];
};
