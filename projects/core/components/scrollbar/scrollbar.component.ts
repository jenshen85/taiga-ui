import {NgIf} from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    inject,
    Input,
} from '@angular/core';
import {TUI_IS_IOS} from '@taiga-ui/cdk/tokens';
import {tuiGetElementOffset, tuiInjectElement} from '@taiga-ui/cdk/utils/dom';
import {TUI_SCROLL_REF} from '@taiga-ui/core/tokens';

import {TuiScrollControls} from './scroll-controls.component';
import {TUI_SCROLLBAR_OPTIONS} from './scrollbar.options';

/**
 * An event for scrolling an element into view within {@link TuiScrollbar}.
 */
export const TUI_SCROLL_INTO_VIEW = 'tui-scroll-into-view';

/**
 * An event to notify {@link TuiScrollbar} that
 * it should control a nested element.
 */
export const TUI_SCROLLABLE = 'tui-scrollable';

@Component({
    standalone: true,
    selector: 'tui-scrollbar',
    imports: [TuiScrollControls, NgIf],
    templateUrl: './scrollbar.template.html',
    styleUrls: ['./scrollbar.style.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: TUI_SCROLL_REF,
            useFactory: () => inject(TuiScrollbar).browserScrollRef,
        },
    ],
    host: {
        '[class._native-hidden]': '!isIOS || hidden',
        [`(${TUI_SCROLLABLE}.stop)`]: 'onScrollable($event.detail)',
        [`(${TUI_SCROLL_INTO_VIEW}.stop)`]: 'scrollIntoView($event.detail)',
    },
})
export class TuiScrollbar {
    private readonly el = tuiInjectElement();

    protected readonly options = inject(TUI_SCROLLBAR_OPTIONS);
    protected readonly isIOS = inject(TUI_IS_IOS);
    protected readonly browserScrollRef = new ElementRef(this.el);

    @Input()
    public hidden = false;

    protected get delegated(): boolean {
        return this.browserScrollRef.nativeElement !== this.el;
    }

    protected onScrollable(element: HTMLElement): void {
        this.browserScrollRef.nativeElement = element;
    }

    protected scrollIntoView(detail: HTMLElement): void {
        if (this.delegated) {
            return;
        }

        const {nativeElement} = this.browserScrollRef;
        const {offsetTop, offsetLeft} = tuiGetElementOffset(nativeElement, detail);
        const {clientHeight, clientWidth} = nativeElement;
        const {offsetHeight, offsetWidth} = detail;
        const scrollTop = offsetTop + offsetHeight / 2 - clientHeight / 2;
        const scrollLeft = offsetLeft + offsetWidth / 2 - clientWidth / 2;

        nativeElement.scrollTo?.(scrollLeft, scrollTop);
    }
}
