import { useRecoilState } from 'recoil';
import { Slider, InputNumber } from '~/components/ui';
import { useLocalize } from '~/hooks';
import store from '~/store';
import { cn, defaultTextProps, optionText } from '~/utils/';

export default function AutoSendTextSwitch() {
  const localize = useLocalize();
  const [autoSendText, setAutoSendText] = useRecoilState(store.autoSendText);
  const [speechToText] = useRecoilState<boolean>(store.SpeechToText);

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center justify-between">
        <div>{localize('com_nav_auto_send_text')}</div>
        <div className="w-2" />
        <small className="opacity-40">
          needs approval for another PR to add the INFO here. Double click to reset to default 3s.
          set 0s to disable
        </small>
      </div>
      <div className="flex items-center justify-between">
        <Slider
          value={[autoSendText ?? 3]}
          onValueChange={(value) => setAutoSendText(value[0])}
          doubleClickHandler={() => setAutoSendText(3)}
          min={0}
          max={60}
          step={1}
          className="ml-4 flex h-4 w-24"
          disabled={!speechToText}
        />
        <div className="w-2" />
        <InputNumber
          value={`${autoSendText}s`}
          disabled={!speechToText}
          onChange={(value) => setAutoSendText(value ? value[0] : 0)}
          min={0}
          max={60}
          className={cn(
            defaultTextProps,
            cn(
              optionText,
              'reset-rc-number-input reset-rc-number-input-text-right h-auto w-12 border-0 group-hover/temp:border-gray-200',
            ),
          )}
        />
      </div>
    </div>
  );
}
