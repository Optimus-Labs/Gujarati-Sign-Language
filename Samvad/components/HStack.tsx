import { StackProps , Stack} from "./Stack";

interface HStackProps extends StackProps {}
export function HStack (props : HStackProps){
  return (
    <Stack {...props} direction="row" />
  );
}