import React from 'react';

const PowerfulTags = () => {
    return (
        <div className='container text-lg ml-12 mb-48'>
            <h2>Those HTML Elements You Never Use 🌚🕵🏿</h2>
            <section>
                <p>“You're late!”</p>
                <del>
                    <p>“I apologize for the delay.”</p>
                </del>
                <ins cite="../howtobeawizard.html" dateTime="2018-05">
                    <p>“A wizard is never late …”</p>
                </ins>
                <p> please press <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>R</kbd> to re-render an mdn page </p>
                <p>let's <mark>mark</mark> the text</p>

                <figure>
                    <img src="https://interactive-examples.mdn.mozilla.net/media/cc0-images/elephant-660-480.jpg" alt="" width="300px" />
                    <figcaption>An elephant at sunset</figcaption>
                </figure>
                <p>Lorem, ipsum dolor.</p>
                <label htmlFor="file">File progress: </label>
                <progress id='file' max="100" value="80">80%</progress>

                <label htmlFor="fuel">Fuel level:</label>

                <meter id="fuel"
                    min="0" max="200"
                    low="70" high="66" optimum="80"
                    value="70">
                    at 50/100
                </meter>

                <details>
                    <summary>Click to see Details</summary>
                    <p>Something small enough to escape casual notice.</p>
                </details>


                <datalist id="ice-cream-flavors">
                    <option value="Chocolate" />
                    <option value="Coconut" />
                    <option value="Mint" />
                    <option value="Strawberry" />
                    <option value="Vanilla" />
                </datalist>

                <object type="application/pdf"
                    data="/dashboard"
                    width="400"
                    height="1200">
                </object>

                <noscript>
                    {/* <!-- anchor linking to external file --> */}
                    <a href="https://www.mozilla.org/">External Link</a>
                </noscript>


            </section>
        </div>
    );
};

export default PowerfulTags;