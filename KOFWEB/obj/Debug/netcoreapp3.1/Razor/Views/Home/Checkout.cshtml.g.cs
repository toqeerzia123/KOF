#pragma checksum "G:\Projects\KOF-toqeer\KOF\KOFWEB\Views\Home\Checkout.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "5fc2fe5f58325b57bc602d56c7361262944a43c9"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_Home_Checkout), @"mvc.1.0.view", @"/Views/Home/Checkout.cshtml")]
namespace AspNetCore
{
    #line hidden
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Mvc.Rendering;
    using Microsoft.AspNetCore.Mvc.ViewFeatures;
#nullable restore
#line 1 "G:\Projects\KOF-toqeer\KOF\KOFWEB\Views\_ViewImports.cshtml"
using KOFWEB;

#line default
#line hidden
#nullable disable
#nullable restore
#line 2 "G:\Projects\KOF-toqeer\KOF\KOFWEB\Views\_ViewImports.cshtml"
using KOFWEB.Models;

#line default
#line hidden
#nullable disable
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"5fc2fe5f58325b57bc602d56c7361262944a43c9", @"/Views/Home/Checkout.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"f2296523f8a3d3aa683a8c38094859bd56ac7d96", @"/Views/_ViewImports.cshtml")]
    public class Views_Home_Checkout : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral("\r\n");
#nullable restore
#line 2 "G:\Projects\KOF-toqeer\KOF\KOFWEB\Views\Home\Checkout.cshtml"
  
    ViewData["Title"] = "MyAccount";
    Layout = "~/Views/Shared/_LayoutWebsite.cshtml";

#line default
#line hidden
#nullable disable
            WriteLiteral(@"
<div class=""page-heading"">
    <div class=""page-title"">
        <h2>Cart</h2>
    </div>
</div>
<div class=""main-container col1-layout"">
    <div class=""main"">
        <div class=""cart"">
            <div class=""table-responsive shopping-cart-tbl  container"">
                <div class=""woocommerce"">
                    <div class=""klb-cart-empty"">
                        <div class=""woocommerce-notices-wrapper""></div>
                        <p class=""cart-empty woocommerce-info"">Your cart is currently empty.</p>
                        <p class=""return-to-shop"">
                            <a class=""button wc-backward"" href=""https://klbtheme.com/qualis/shop/"">
                                Return to shop
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!--WPFC_FOOTER_START-->
<div class=""container"">
    <div class=""row our-features-box"">
        <ul>
            ");
            WriteLiteral(@"<li>
                <div class=""feature-box klb-footer-box"">
                    <i class=""fa fa-truck""></i>
                    <div class=""content"">FREE SHIPPING on order over $99</div>
                </div>
            </li>
            <li>
                <div class=""feature-box klb-footer-box"">
                    <i class=""fa fa-phone""></i>
                    <div class=""content"">HAVE A QUESTIONS? <a href=""10800 7890000"">+10800 789 0000</a></div>
                </div>
            </li>
            <li>
                <div class=""feature-box klb-footer-box"">
                    <i class=""fa fa-usd""></i>
                    <div class=""content"">100% MONEY BACK GUARANTEE</div>
                </div>
            </li>
            <li>
                <div class=""feature-box klb-footer-box"">
                    <i class=""fa fa-briefcase""></i>
                    <div class=""content"">30 DAYS RETURN SERVICE</div>
                </div>
            </li>
            <li class=""last");
            WriteLiteral(@""">
                <div class=""feature-box"">
                    <a href=""#""><i class=""fa fa-apple""></i> Download</a>
                    <a href=""#""><i class=""fa fa-android""></i> Download</a>
                </div>
            </li>
        </ul>
    </div>
</div>");
        }
        #pragma warning restore 1998
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.ViewFeatures.IModelExpressionProvider ModelExpressionProvider { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IUrlHelper Url { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IViewComponentHelper Component { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IJsonHelper Json { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IHtmlHelper<dynamic> Html { get; private set; }
    }
}
#pragma warning restore 1591
