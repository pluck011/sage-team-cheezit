import {Component, Input, OnInit} from '@angular/core';
import {PlayCard} from "../card/card";

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

    constructor() {
    }

    @Input() card: PlayCard;

    @Input() selected?: number[] = [];

    @Input() hideSelected?: boolean = false;

    @Input() emoji?: string = "";

    ngOnInit() {
        if (this.canSpeak) {
            window.speechSynthesis.getVoices(); // this forces it to get the available voices before they are needed
            // or else it would use the default system voice the first time and then switch
        }
    }

    speakWord() {
        if (this.canSpeak) {
            let msg = new SpeechSynthesisUtterance();
            let voices = window.speechSynthesis.getVoices();
            for (let voice of voices) {
                if (voice.voiceURI == "Google US English") { // prefer Google's voice
                    msg.voice = voice;
                }
            }
            msg.text = this.card.word;
            window.speechSynthesis.speak(msg);
        }
    }

    canSpeak: boolean = ('speechSynthesis' in window);

}
