---
title: Adding search filters in Django eCommerce website 
date: 2020-04-14
published: true
tags: ['django 2.2', 'Django Ecommerce', 'python']
series: false
cover_image: ./uploads/2020/03/Adding-search-filters-in-Django-eCommerce-website.jpg
social_img: https://res.cloudinary.com/manascode/image/upload/v1590809434/manascode.com/Adding-search-filters-in-Django-eCommerce-website.e978dc2.0d0d32a6c36497202f5f3ece307ab6e7_jho46l.jpg
canonical_url: true
description: "In this tutorial we are going to cover how you can search filter to your Django eCommerce website. We also fixed some bugs of our previous tutorial."
---

<Author/>

A lot of you guys requested to make the next part of **Django ecommerce tutorial series**. So in this part, we are going to cover the adding search filter and fix some bugs in django eCommerce website.

**Making an eCommerce website in django** will help you to learn in depth about **Django**. I hope you get some knowledge from reading the previous tutorials. If you are reading this tutorial for the first time. I recommend you to read those previous tutorial first if you haven’t.

Previous parts of django eCommerce tutorials
--------------------------------------------

- [Real world SAAS application in Django tutorial](http://manascode.com/real-world-saas-application-in-django-tutorial/)
- [Build a SaaS Application in Django 3.0| SaaS Series](/build-a-saa-s-application-in-django-3-0-saa-s-series/)
- [Stripe Payment Gateway Integration in Django eCommerce Website](http://manascode.com/stripe-payment-gateway-integration-in-django-ecommerce-website/)
- [Django eCommerce tutorial part two](http://manascode.com/django-ecommerce-tutorial-part-two-django-allauth/)

What we are going to learn in this part
---------------------------------------

First of all I thought about to finish the [`Build a SAAS application in Django`](https://manascode.com/build-a-saas-application-in-django-3-saas-series/). But in the previous Django ecommerce tutorial parts, some of you commented about getting some issue, and write a tutorial about search filter. So in this part we are going to cover the search products in our Django ecommerce website.

Before start working on the adding search filter for products, I am going to fix the issue you were getting while pay through Stripe ( The issue is only for Indian users ). Stripe has updated their API so that’s why we are getting some issue on checkout. So to fix that you need to do change the currency.

 The payment setup with stripe is a huge amount of work, so I thought to make a different tutorial post completely about stripe integration. I also though about to make a tutorial on **“How you can integrate Paytm in your Django website”**. But unfortunate I don’t have an business account on Paytm.

Okay so to fix the checkout issue, we need to change the currency **USD to INR** in views.py file.

checkout/views.py file code

```py
# change usd to inr to fix the issue.
def payment(request):
	key = settings.STRIPE_PUBLISHABLE_KEY
	order_qs = Order.objects.filter(user= request.user, ordered=False)
	order_total = order_qs[0].get_totals() 
	totalCents = float(order_total * 100);
	total = round(totalCents, 2)
	if request.method == 'POST':
		charge = stripe.Charge.create(amount=total,
            currency='inr', 
            description=order_qs,
            source=request.POST['stripeToken'])
		print(charge)
        
	return render(request, 'checkout/payment.html', {"key": key, "total": total})
```

Just use this code instead of the payment view code, the checkout issue will solve. ( If you’re in another country use your country’s currency code instead of the India code ) .

Fixing another bug
------------------

When I was working on the filter code I also noticed a bug in our cart view. The bug was, suppose I ordered a T-shirt on our website, and after that when I try to add the same product in my cart the product won’t show in the cart view.

 I don’t you guys noticed that or not, if you do that’s fine. ( If you noticed any other bug please comment down below so we can fix that and you can learn something out of it. ) . If want to solve any issue or add any new feature in the Django eCommerce project we are building together, please feel free to to do that.

> For those of you who don’t know how to contribute to a project on Github, just search on google you will a find a tons on tutorial and just do it. It will help you a lot to learn and be a better developer.

If you look at the previous cart view code, you will also find where is the bug. Previous code of view.py in cart app

```py
# Add to Cart View

def add_to_cart(request, slug):
    item = get_object_or_404(Product, slug=slug)
    order_item, created = Cart.objects.get_or_create(
        item=item,
        user=request.user
    )
    order_qs = Order.objects.filter(user=request.user, ordered=False)
    if order_qs.exists():
        order = order_qs[0]
        # check if the order item is in the order
        if order.orderitems.filter(item__slug=item.slug).exists():
            order_item.quantity += 1
            order_item.save()
            messages.info(request, f"{item.name} quantity has updated.")
            return redirect("mainapp:cart-home")
        else:
            order.orderitems.add(order_item)
            messages.info(request, f"{item.name} has added to your cart.")
            return redirect("mainapp:cart-home")
    else:
        order = Order.objects.create(
            user=request.user)
        order.orderitems.add(order_item)
        messages.info(request, f"{item.name} has added to your cart.")
        return redirect("mainapp:cart-home")
```


If you guys take a look of line number 4-8 you will see that we are using `get_objector_404()` function to create the cart view. And with our logic if there is **cart object** exists with the corresponding item and the requested user then use the existing one. After that we are just updating the cart item count on that existing cart item in our database.

But as we know that we have a field called **`purchased`** in our cart models.py . In case if you are new to this tutorial here is our models.py file [link](https://github.com/imanaspaul/Django-eCommerce-tutorial-manascode/blob/master/ecommerce/cart/models.py#L9) and here is our cart model .

```py
# Cart Model
class Cart(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    item = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)
    purchased = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return f'{self.quantity} of {self.item.name}'

    def get_total(self):
        total = self.item.price * self.quantity
        floattotal = float("{0:.2f}".format(total))
        return floattotal
```


Now we should check the cart item has already purchased or not while run a query on our cart model. So to do that, we just need to pass an extra arguments to query.

Here is new cart create view code.

```py
# Add to Cart View

def add_to_cart(request, slug):
    item = get_object_or_404(Product, slug=slug)    
    order_item, created = Cart.objects.get_or_create(
        item=item,
        user=request.user,
        purchased=False
    )
    order_qs = Order.objects.filter(user=request.user, ordered=False)
    if order_qs.exists():
        order = order_qs[0]
        # check if the order item is in the order
        if order.orderitems.filter(item__slug=item.slug).exists():
            order_item.quantity += 1
            order_item.save()
            messages.info(request, f"{item.name} quantity has updated.")
            return redirect("mainapp:cart-home")
        else:
            order.orderitems.add(order_item)
            messages.info(request, f"{item.name} has added to your cart.")
            return redirect("mainapp:cart-home")
    else:
        order = Order.objects.create(
            user=request.user)
        order.orderitems.add(order_item)
        messages.info(request, f"{item.name} has added to your cart.")
        return redirect("mainapp:cart-home")
```


</div>Previous bugs are fixed now focus on adding search filter.

Adding search filter for your products
--------------------------------------

To add a search filer in our Django eCommerce Project, there are lots of ways to do that. But we are going to do that in simple and robust way. We are going to use [django-filter ](https://django-filter.readthedocs.io/en/master/) third party application to make the job done faster.

### Install the Package

To install open your terminal and type the following command. You can also follow the documentation to get more info about it.

```bash
    $ pip install django-filter
```

Before installing make sure your virtual environment is activated.

Now go to your project’s settings.py file and add the app name to your installed app list.

```py
INSTALLED_APPS = [
    ...
    'django_filters',
]
```


### Creating the filter form

Before creating the filter form we need to think, in which fields we want to able to filter the products. In our case I think the product name and the price will be much better.

So now, create a new python file in products app, called **`filters.py`**. And paste this lines of code into the filters.py file.

```py
from . models import Product
import django_filters
from django_filters.filters import RangeFilter

# Creating product filters
class ProductFilter(django_filters.FilterSet):
    name = django_filters.CharFilter(lookup_expr='icontains')
    price = RangeFilter()


    class Meta:
        model = Product
        fields = ['name', 'price']
```


In this file, we are creating a class called ProductFilter which inherits FilterSet from django filter. Then we have created two fields one is for name which is `Charfield`. Another one is price which I used `RangeField` cause I think people can filter products based on their budget.

> [You can get more fields information by going to this url](https://django-filter.readthedocs.io/en/master/ref/filters.html#filters)


### Create the filter view

To create the filter view we are going to use our existing product’s `ListView`, which is currently on the home page. You can create a an another page if you want.

Here is the Prouct List View code.


```py
class Home(ListView):
    model = Product
    template_name = 'products/home.html'


    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['filter'] = ProductFilter(self.request.GET, queryset=self.get_queryset())
        return context

```

In the class based view, we can get the context using `get_context_data()` function, then we are just passing our filter form as an extra context. By the don’t forget to import the form.

```py
from .filters import ProductFilter
```


### Add the form into template

In our home temple we have used bootstrap to make the design look good. So I am not going to focus on telling about each and every part of the design. I just adjust the design for you, Here is the new home page design.

```py
{% extends 'products/base.html' %}
{% load crispy_forms_tags %}
{% block content %}
<div class="container my-5">
   <h2 class="my-5">Featured Products</h2>
   <div class="row">
      <div class="col-md-3">
         <form method="get">
            {{ filter.form| crispy }}
            <button type="submit">Search</button>
         </form>
      </div>
      <div class="col-md-9">
         <div class="row">
            {% for product in filter.qs %}
            <div class="col-md-6 col-sm-12 col-lg-4">
               <figure class="card card-product">
                  <div class="img-wrap"> 
                     <img src="media/{{ product.mainimage }}" style="width: 100%; height: 300px;">
                  </div>
                  <figcaption class="info-wrap">
                     <h6 class="title text-dots"><a href="{{ product.get_absolute_url }}">{{ product.name }}</a></h6>
                     <div class="action-wrap">
                        <!-- <a href="cart/{{ product.slug }}" class="btn btn-primary btn-sm"> Add to Cart </a>
                           <a href="cart/" class="btn btn-primary btn-sm"> View Cart </a> -->
                        <!--             <a href="remove/{{ product.slug }}" class="btn btn-danger btn-sm"> Remove</a>
                           -->						<!-- price-wrap.// -->
                        <div class="price-wrap h5">
                           <span class="price-new">${{product.price}}</span>
                           <del class="price-old">$1980</del>
                        </div>
                     </div>
                     <!-- action-wrap -->
                  </figcaption>
               </figure>
               <!-- card // -->
            </div>
            <!-- col // -->
            {% endfor %}
         </div>
      </div>
   </div>
</div>
{% endblock %}
```


Now in the home.html the context variable will be `filter.qs` instead of `object_list`. Save all the files you edited and run the server. Now you should get a filter for your django ecommerce website.

> I you like this kind of tutorials **please support us** if you can, you single contribution will help us to provide more such contents.

If you do have any question or any suggestion please leave a comment below, and if you want to contribute to the project feel free to do that our github repo. If you find any kind of mistakes that I made also please let me know in comment section.

And if you think this could be help full for other please share this tutorial link with your social media wall.

> If you haven’t subscribe to our mailing list go ahead and subscribe. We won’t send you any kind of spam email. Only you will our tutorials email notification.