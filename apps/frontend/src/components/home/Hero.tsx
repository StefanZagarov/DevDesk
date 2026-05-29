import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function Hero() {
  return (
    <>
      <div className="flex gap-6">
        <div className="flex flex-col p-20 ">
          <h1 className="text-5xl">
            Find what you <span className="text-primary">forgot</span>
          </h1>
          <p className="max-w-md pt-4 text-subtext">
            Save links, notes, and snippets as you browse. Tag them once.
            DevDesk surfaces them back when you need them — even the ones you
            forgot you saved.
          </p>
        </div>

        <Card className="w-100 h-fit gap-12 text-center">
          <CardTitle>A disasterpiece</CardTitle>
          <CardHeader>Set in motion</CardHeader>
          <CardContent>
            Placeholder for a picture of the app's main feature
          </CardContent>
          <CardFooter className="justify-center">Maybe</CardFooter>
        </Card>
      </div>
    </>
  );
}
