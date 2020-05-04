<template>
    <Layout :show-logo="false">
    <div class="posts content-box">
        <h2>Contact us</h2>
        If you have any queries about Python, Djnago, JavaScript or Vue or any other information. Please let us know through the contact form Manascode.com .
        <br>
        <div class="about-us">
            
            <form
            action="https://formspree.io/mbjkzzvq"
            method="POST"
            >
            <label>
                <input type="text" name="_replyto" placeholder='email'>
            </label>
            <label>
                <textarea name="message" placeholder='message'></textarea>
            </label>

            <!-- your other form fields go here -->

            <button class='submit-btn' type="submit">Send</button>
            </form>
        </div>
    </div>
    </Layout>
</template>
<style lang='scss'>
label{
    display: block;
    input, textarea{
       display: inline-block;
       width: 100%;
       height: 35px;
       border-radius: 10px;
       border: 1px solid var(--link-color);
       margin: 10px 0px 20px 0px;
       padding: 10px;
    }
    textarea{
        height: 350px;
    }
    
}
button {
        width: 100%;
        height: 40px;
        background-color: var(--link-color);
        border-radius: 10px;
        border: 1px solid var(--link-color);
        color: white;
        &:hover{
            cursor: pointer;
        }
    }

</style>