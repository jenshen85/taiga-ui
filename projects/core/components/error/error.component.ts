import {AsyncPipe, NgIf} from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    HostListener,
    inject,
    Input,
} from '@angular/core';
import {TuiValidationError} from '@taiga-ui/cdk/classes';
import {TuiLet} from '@taiga-ui/cdk/directives/let';
import {tuiIsString} from '@taiga-ui/cdk/utils/miscellaneous';
import {tuiFadeIn, tuiHeightCollapse} from '@taiga-ui/core/animations';
import {TUI_ANIMATIONS_SPEED, TUI_DEFAULT_ERROR_MESSAGE} from '@taiga-ui/core/tokens';
import {tuiToAnimationOptions} from '@taiga-ui/core/utils';
import {PolymorpheusOutlet, PolymorpheusTemplate} from '@taiga-ui/polymorpheus';

@Component({
    standalone: true,
    selector: 'tui-error',
    imports: [AsyncPipe, NgIf, PolymorpheusOutlet, PolymorpheusTemplate, TuiLet],
    templateUrl: './error.template.html',
    styleUrls: ['./error.style.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [tuiHeightCollapse, tuiFadeIn],
})
export class TuiError {
    protected readonly options = tuiToAnimationOptions(inject(TUI_ANIMATIONS_SPEED));
    protected error: TuiValidationError | null = null;
    protected visible = true;
    protected readonly defaultErrorMessage$ = inject(TUI_DEFAULT_ERROR_MESSAGE);

    @Input('error')
    public set errorSetter(error: TuiValidationError | string | null) {
        this.error = tuiIsString(error) ? new TuiValidationError(error) : error;
    }

    @HostListener('animationcancel.self', ['false'])
    @HostListener('animationstart.self', ['true'])
    protected onAnimation(visible: boolean): void {
        this.visible = visible;
    }
}
