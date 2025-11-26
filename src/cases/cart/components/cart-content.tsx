
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useCart } from "../hooks/use-cart"
import { Item, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemTitle } from "@/components/ui/item";
import { FormattedNumber, IntlProvider } from "react-intl";

import { Button } from "@/components/ui/button";
import { MapPin, Trash2 } from "lucide-react";
import { Tooltip, TooltipTrigger } from "@/components/ui/tooltip";
import { TooltipContent } from "@radix-ui/react-tooltip";
import { QuantityInput } from "@/components/ui/quantity-input";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";

export function CartContent() {
    const { cart, removeProductCart } = useCart();

    const bucketBaseURL = import.meta.env.VITE_BUCKET_BASE_URL;


    return (

        <div className="flex gap-4">
            <Card className="w-full mt-8">
                <CardContent>
                    <ItemGroup className="gap-4">
                        {cart.items.map((item, index) => (
                            <Item key={index} variant="muted" role="listitem" asChild>

                                <div>
                                    <ItemMedia variant="image">
                                        {item.product.photos?.length && (
                                            <img
                                                src={`${bucketBaseURL}${item.product.photos[0].path}`}
                                                className="w-8 h-8 object-cover grayscale" />
                                        )}
                                    </ItemMedia>
                                    <ItemContent>
                                        <ItemTitle className="line-clamp-1">
                                            {item.product.name}
                                        </ItemTitle>
                                        <ItemDescription>
                                            {item.product.brand?.name}
                                        </ItemDescription>
                                    </ItemContent>

                                    <ItemContent className="flex-none text-cover">
                                        <ItemTitle>
                                            <div className="flex flex-row gap-4">

                                                <div>
                                                    <QuantityInput initialQuantity={item.quantity}/>
                                                </div>

                                                <div className=" flex flex-col">
                                                    <p className="font-semibold flex justify-end gap-1.5">
                                                        <IntlProvider locale="pt-BR">
                                                            <FormattedNumber value={item.product.price * 0.9} style="currency" currency="BRL" /> no PIX
                                                        </IntlProvider>
                                                    </p>
                                                    <p className="font-semibold flex justify-end gap-1.5">em 10x de </p>
                                                    <p className="font-semibold flex justify-end gap-1.5">
                                                        <IntlProvider locale="pt-BR">

                                                            <FormattedNumber value={item.product.price / 10} style="currency" currency="BRL" />
                                                        </IntlProvider> no Cartão
                                                    </p>
                                                </div>
                                                <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button
                                                        size="icon"
                                                        variant="ghost"
                                                        onClick={() => removeProductCart(item.product.id!)}
                                                    >
                                                        <Trash2 className="text-gray-700" />
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent> Excluir</TooltipContent>
                                                </Tooltip>
                                            </div>
                                        </ItemTitle>
                                    </ItemContent>

                                </div>

                            </Item>
                        ))}
                    </ItemGroup>
                </CardContent>
            </Card >

            <div className="flex flex-col w-md mt-8 gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm">Frete para CEP</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <InputGroup>
                            <InputGroupInput placeholder="CEP"/>
                            <InputGroupAddon>
                                <MapPin className= "text-blue-500"/>
                            </InputGroupAddon>
                            <InputGroupAddon align="inline-end">
                                <Button variant="ghost" size="sm"
                                    className="-mr-1 hover:bg-transparent hover:text-blue-500"
                                    >
                                        Calcular
                                    </Button>
                                </InputGroupAddon>
                        </InputGroup>
                    </CardContent>
                </Card>
                
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm">Total Pedido:</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-2">
                        <ItemGroup>
                            <Item variant="muted">
                                <ItemContent>
                                <ItemTitle>Frete:</ItemTitle>
                                </ItemContent>
                                <ItemContent>
                                <ItemTitle>
                                    <div className="flex flex-col">
                                        <p className="text-xs font-semibold flex justify-end gap-1.5">
                                            <IntlProvider locale="pt-BR">
                                                <FormattedNumber value={0} style="currency" currency="BRL"/>
                                            </IntlProvider>
                                        </p>
                                    </div>
                                </ItemTitle>
                                </ItemContent>
                            </Item>
                        </ItemGroup>

                        <ItemGroup>
                            <Item variant="muted">
                                <ItemContent>
                                <ItemTitle>Produtos:</ItemTitle>
                                </ItemContent>
                                <ItemContent>
                                <ItemTitle>
                                    <div className="flex flex-col">
                                        <p className="text-xs font-semibold flex justify-end gap-1.5">
                                            <IntlProvider locale="pt-BR">
                                                <FormattedNumber value={500} style="currency" currency="BRL"/>
                                            </IntlProvider>
                                        </p>
                                    </div>
                                </ItemTitle>
                                </ItemContent>
                            </Item>
                        </ItemGroup>

                        <ItemGroup>
                            <Item variant="muted">
                                <ItemContent>
                                <ItemTitle>Total:</ItemTitle>
                                </ItemContent>
                                <ItemContent>
                                <ItemTitle>
                                    <div className="flex flex-col">
                                        <p className="text-xs font-semibold flex justify-end gap-1.5">
                                            <IntlProvider locale="pt-BR">
                                                <FormattedNumber value={500*0.9} style="currency" currency="BRL"/> no PIX
                                            </IntlProvider>
                                        </p>
                                        <p className="text-xs font-light flex justify-end gap-1.5">
                                            <IntlProvider locale="pt-BR">
                                                <FormattedNumber value={500} style="currency" currency="BRL"/> no Cartão
                                            </IntlProvider>
                                        </p>
                                    </div>
                                </ItemTitle>
                                </ItemContent>
                            </Item>
                        </ItemGroup>
                    </CardContent>
                    <CardFooter>
                        <Button
                            className="w-full bg-blue-500 hover:bg-blue-700 text-white"
                        >
                            Finalizar o Pedido
                        </Button>
                    </CardFooter>
                </Card>

            </div>

        </div >

    )

}