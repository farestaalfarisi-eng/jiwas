// prompts/hijab.js
// Database Prompt Modular - Katalog Hijab Luxury Edition (1-100)
// Powered by Smart Template Engine (Fast & Lightweight)

(function () {
  // 1. DAFTAR INTI VISUAL UNIK 100 FOTO
  const BASE_PROMPTS = [
    /* 001 */ "young beautiful Indonesian woman in a medium shot looking gracefully to the side, pastel-patterned square hijab with ribbon knot, beige high-neck blouse with soft dusty peach satin puff sleeves, holding quilted beige handbag, scenic coastal overlook background",
    /* 002 */ "young Indonesian woman sitting at marble cafe table in 3/4 pose, holding smartphone and touching cheek, dusty pink chiffon hijab, white collared blouse with shoulder ruffles, black corset vest, black tulle skirt with gold moon motifs",
    /* 003 */ "close-up of beautiful Indonesian woman looking upwards with gentle smile, beige knit hijab under tan wool beret, mustard coat, plaid heart scarf, holding fresh snow in cupped hands, dark winter night street golden bokeh background",
    /* 004 */ "medium close-up of smiling Indonesian woman adjusting lace-trimmed cream hijab with 3D floral pins, plush pink faux-fur jacket over cream top, pearl and floral jewelry, soft floating misty smoke around frame",
    /* 005 */ "ethereal bridal portrait of Indonesian woman touching chin delicately, white lace and tulle gown with butterfly accents, white hijab, lace veil, floral tiara, magical sparkling particles in snow-white studio",
    /* 006 */ "full-length standing shot of beautiful Indonesian woman in luxury kitchen, smiling holding plate of Indonesian fried rice (nasi goreng), beige chiffon hijab, beige pleated blouse, blue denim jeans, royal blue cabinets background",
    /* 007 */ "medium shot of charming Indonesian woman smiling radiantly holding fresh bunch of red rambutan fruits, black chiffon hijab with crystal edges, black abaya with gold and crystal beaded sleeves, green hedge wall background",
    /* 008 */ "framed through oval vintage mirror reflection, Indonesian woman sitting at dark wooden cafe table touching chin holding pink smartphone, black hijab with gold leaf brooch, gold earrings, black lace dress, cozy cafe interior background",
    /* 009 */ "medium shot inside custom pink luxury car, radiant Indonesian woman in passenger seat holding pink gerbera daisy bouquet with gold tiara, white chiffon hijab, white blouse, plush pink leather interior background",
    /* 100 */ "medium framing of smiling Indonesian woman holding crystal crown tiara with both hands near chest, soft pink chiffon hijab, dusty pink plush faux-fur cardigan, black clover necklace, pink vanity room with glowing bulb lights background",
    
    /* 011 */ "full-length standing shot on rock in crystal-clear turquoise ocean water, blowing a kiss, soft cream chiffon hijab with side flowers, cream dress with green and pink hibiscus print, limestone karst islands background",
    /* 012 */ "full 3/4 pose sitting on white woven chair at outdoor cafe terrace holding white coffee cup, dusty pink chiffon hijab, dusty pink blazer, layered dusty pink tulle pleated skirt, nude heels, modern cafe courtyard background",
    /* 013 */ "full-body seated on white wooden chair at sandy beach resort terrace, leaning cheek on hand holding traditional floral hand fan, cream hijab, beige floral cardigan, white trousers, dim sum and orange juice on table background",
    /* 014 */ "close-up playful Indonesian woman pointing finger against cheek, off-white soft jersey hijab, cozy off-white ribbed knit sweater, minimalist white door frame illuminated by warm sunlight background",
    /* 015 */ "medium close-up sweet Indonesian woman hugging round white plush duck toy tightly, champagne satin hijab, soft silk top, pastel rainbow tulle skirt, toy store soft-focused shelves background",
    /* 016 */ "full-length standing shot resting hand against mossy rock cliff, dusty rose chiffon hijab, long-sleeved cream floral maxi dress, white sneakers, brown straw sunhat, vintage camera, turquoise tropical river and wooden longtail boat background",
    /* 017 */ "leaning gracefully against wooden bridge railing in 3/4 medium framing, soft cream hijab, cream dress with red cherry patterns, idyllic countryside valley, flowing stream, flower gardens, log cabins and snow-capped mountain background",
    /* 018 */ "medium close-up cute finger-heart gesture near face smiling, beige chiffon hijab, fuzzy cream cardigan with pearl embellishments, silver wristwatch, outdoor cafe terrace at night with golden string lights background",
    /* 019 */ "close-up both hands resting under chin holding pink satin scrunchies, crisp black jersey hijab, dark denim jacket, deep burgundy polished nails, sleek wristwatch, clean grey studio backdrop",
    /* 020 */ "medium close-up making peace sign gesture showing dental braces, soft beige chiffon hijab, black long-sleeved top, gold rings, lime-green smartwatch, modern cafe interior with houseplants background",

    /* 021 */ "extreme close-up smiling warmly showing teeth making hand gesture near temple, smooth nude-beige satin hijab, gold ring, delicate bracelet, pastel pink arched beauty salon interior background",
    /* 022 */ "framed through oval vintage mirror sitting in aesthetic coffee shop holding pink smartphone, black chiffon hijab with gold leaf brooch, gold earrings, black lace dress, industrial-chic cafe interior background",
    /* 023 */ "medium shot inside custom pink luxury car, holding pink gerbera daisy bouquet topped with rose-gold tiara, pure white chiffon hijab, white blouse, pink stitched leather car interior background",
    /* 024 */ "medium close-up holding crystal crown tiara delicately near chest, soft dusty-pink chiffon hijab, dusty-pink plush faux-fur cardigan, black clover necklace, luxury vanity room background",
    /* 025 */ "full-length standing on rock in turquoise island waters blowing a kiss, soft cream chiffon hijab with floral pin, cream dress with hibiscus print, green karst cliffs background",
    /* 026 */ "full-length sitting on white woven chair at outdoor cafe terrace holding coffee cup, dusty pink chiffon hijab, dusty pink suit jacket, dusty pink tulle skirt, nude high heels, modern white building background",
    /* 027 */ "sitting cross-legged on white chair at beach resort holding open painted folding fan, beige hijab, light cream floral cardigan, white wide-leg trousers, turquoise sea and macrame umbrella background",
    /* 028 */ "close-up touching cheek playfully with one finger, off-white jersey hijab, cozy off-white ribbed sweater, minimalist interior door frame streaming warm natural sunlight background",
    /* 029 */ "medium close-up hugging large white duck plushie, shimmering champagne satin hijab, silk blouse, pastel rainbow pleated skirt, plush toy store shelves background",
    /* 030 */ "full-length walking along stone path by mossy cliff holding straw sunhat with retro camera, dusty rose chiffon hijab, cream floral maxi dress, white sneakers, turquoise river and jungle cliffs background",

    /* 031 */ "3/4 medium framing resting hands on rustic wooden bridge railing, soft cream chiffon hijab, beige dress with red cherry prints, Alpine countryside river, flower beds, pine forest background",
    /* 032 */ "medium close-up at outdoor cafe table making finger-heart gesture, soft beige chiffon hijab, plush cream knit cardigan with pearl beads, silver wristwatch, night cafe string lights background",
    /* 033 */ "extreme close-up intense gaze resting face against hand holding pink scrunchie, black jersey hijab, dark denim jacket, burgundy glossy nails, clean light grey studio background",
    /* 034 */ "medium close-up making peace sign showing silver braces, nude-beige chiffon hijab, black inner top, gold floral rings, lime-green smartwatch, bright modern cafe background",
    /* 035 */ "medium close-up at outdoor night bistro table making finger-heart gesture, smooth cream hijab, fuzzy off-white cardigan with pearls, silver wristwatch, pearl bracelet, bistro fairy lights background",
    /* 036 */ "medium shot touching wireless silver over-ear headphones, light beige baseball cap over wavy dark hair, off-shoulder white hoodie, white tank top, gold necklace, sunlit indoor lounge background",
    /* 037 */ "medium shot sitting sideways at wooden cafe counter holding wireless headphones, beige embroidered baseball cap, off-shoulder cream cardigan, white rib-knit tank top, denim jeans, cozy cafe interior background",
    /* 038 */ "medium close-up with serene expression, light grey chiffon hijab, grey tulle dress with floral lace and sequins, holding delicate crystal butterflies with glowing dust particles, pastel blue gradient background",
    /* 039 */ "medium framing sitting in small wooden rowboat on tranquil lake touching cheek softly, beige chiffon hijab, sage green pleated maxi dress, boat filled with white hydrangeas, sunset reflections background",
    /* 40 */ "medium shot sitting low amidst field of purple tulips holding yellow flower bouquet, pure white chiffon hijab, yellow knit cardigan, pearl necklace, white tulle skirt, bright blue sky background",

    /* 041 */ "3/4 medium framing posing under blooming frangipani tree on sandy beach, resting hand on wide straw hat, holding frangipani branch, light blue chiffon hijab, light blue floral maxi dress, turquoise ocean background",
    /* 042 */ "medium close-up sitting gracefully on white sandy beach during golden sunset touching face, pure white chiffon hijab, white blouse with ruffled cuffs, gold flower pendant necklace, ocean horizon sunset background",
    /* 043 */ "close-up looking back over shoulder making finger-heart gesture, white chiffon hijab with ribbon bow, white sheer blouse with 3D floral lace, metallic smartwatch, sunset beach background",
    /* 044 */ "medium close-up posing at floral vanity set holding pink butterfly on raised finger, dusty pink satin hijab with rose tiara headband, pink embroidered dress with fur cuffs, pink dressing room background",
    /* 045 */ "extreme close-up touching lower lip with blue contact lenses, pastel pink chiffon hijab with blue borders and butterfly patches, rose crown, pink floral gown with 3D butterflies, face glitters, pastel sparkling background",
    /* 046 */ "3/4 medium framing standing in shallow ocean water with outstretched arms, light-blue chiffon hijab, mint-green sunhat, navy blue blouse with ruffled collars, blue-and-white floral skirt, tropical beach background",
    /* 047 */ "3/4 medium shot standing in lush green park with sunglasses on top of polka-dot blue hijab, light blue lace top, white tulle skirt, blue shoulder bag with bear keychain, blue star umbrella background",
    /* 048 */ "medium close-up sitting on white sofa hugging pink pillow with letter 'G', pastel rainbow gradient chiffon hijab, dusty blue knit cardigan with embroidered pink flowers, white top, living room background",
    /* 049 */ "medium close-up holding bouquet of gerbera daisies and baby's breath, dusty-pink chiffon hijab with grand silver tiara and pearl strands, pink sequined dress, butterfly rings, white daisy field background",
    /* 050 */ "medium shot waving hand near blue skincare display holding light blue baby's breath, white chiffon hijab, white blouse, clear glass table with serum bottles and ice cubes, sky blue cosmetic studio background",

    /* 051 */ "extreme close-up resting chin on stacked hands on wooden table next to blue skincare serum bottles 'Ghani Secret', clean white chiffon hijab with blue flower hairpins, minimalist studio background",
    /* 052 */ "medium framing sitting gracefully indoors resting chin on hand, pure white chiffon hijab, warm camel-brown sweater with tied cuffs, white trousers, gold wristwatch, cozy residential interior background",
    /* 053 */ "full-length standing shot posing in botanical tulip garden hands brought together, soft cream chiffon hijab, cream maxi dress with rich colorful floral prints, cobblestone path and tulips background",
    /* 054 */ "medium close-up looking back over shoulder confidently, sleek black chiffon hijab, black knit sweater with white heart motifs, futuristic tunnel with neon blue and purple metallic arches background",
    /* 055 */ "medium framing standing on paved courtyard path forming heart shape with hands, light peach chiffon hijab, peach peplum blouse with ruffled shoulders, white pleated skirt, modern luxury house background",
    /* 056 */ "3/4 medium framing in villa courtyard making heart gesture near chest, dark navy blue chiffon hijab, navy blue blouse with ruffled lace trim, white skirt, swimming pool and Monstera plants background",
    /* 057 */ "medium shot along stone path in countryside garden making double finger-heart gestures, clean white hijab, white cardigan with black bowknots, denim jeans, thatched gazebo and rice fields background",
    /* 058 */ "medium framing standing in front of A-frame wooden cabin making double finger-heart gestures, soft pastel yellow chiffon hijab, yellow knit cardigan with 3D white flower patches, denim jeans, gravel patio background",
    /* 059 */ "medium close-up in front of outdoor cafe hut making double finger-heart gestures, chocolate brown chiffon hijab, dark brown ribbed cardigan with pink bowknots, denim jeans, tropical plants background",
    /* 060 */ "medium shot standing on wooden footbridge over forest waterfall, soft yellow chiffon hijab, yellow pinstripe wrap blouse, blue denim skirt, turquoise pool and mossy rocks background",

    /* 061 */ "3/4 medium framing standing on stone riverbank by roaring waterfall, sage green chiffon hijab, sage green pinstripe wrap blouse, blue denim skirt, pine trees and turquoise pool background",
    /* 062 */ "3/4 medium framing on wooden footbridge over clear river, dusty light-blue chiffon hijab, light-blue pinstriped peplum blouse, blue denim skirt, jungle waterfall and thatched hut background",
    /* 063 */ "3/4 side-profile standing on stone terrace looking back gracefully, soft ivory chiffon hijab, ivory high-neck ballgown with purple floral lace, Lake Como and distant mountains background",
    /* 064 */ "posing gracefully on curved wooden boardwalk over pond holding gown, dark navy blue chiffon hijab, dark navy blue tulle ballgown with turquoise 3D floral appliques, woodland sanctuary background",
    /* 065 */ "full 3/4 shot standing on wooden boardwalk alongside serene lake, seafoam mint-green chiffon hijab, seafoam green gown with floral embroidery, white iris flower beds background",
    /* 066 */ "3/4 medium framing making peace sign gesture near cheek, deep maroon chiffon hijab, rich burgundy knit sweater, blue denim jeans, Taj Mahal sunset background",
    /* 067 */ "medium shot along stone plaza touching chin softly, soft dusty grey chiffon hijab, grey argyle cardigan, white collared shirt, grey midi skirt, Ottoman mosque background",
    /* 068 */ "full 3/4 side-profile looking back gracefully, soft ivory chiffon hijab, dark navy blue striped cropped sweater, denim jeans, fantasy castle with golden spires background",
    /* 069 */ "side-profile 3/4 framing standing along cobblestone path, sleek black chiffon hijab, striped blouse with white cuffs, grey denim jeans, horse topiary sculptures background",
    /* 070 */ "medium shot standing on blue canal walkway carrying black designer leather handbag, off-white chiffon hijab, cream blazer with gold buttons, light blue wide-leg jeans, Santorini white buildings background",

    /* 071 */ "medium shot making 'L' hand gesture with raised right hand, sleek black chiffon hijab, light blue tweed cropped jacket with frayed trim, white inner top, high-waisted denim jeans, stone canal bridge background",
    /* 072 */ "3/4 medium framing along green lawn path holding fresh pink rose bouquet, soft dusty-pink satin hijab with bow, dusty-pink silk gown, formal rose garden background",
    /* 073 */ "medium shot standing in blooming daisy field holding wild white daisy bouquet, deep navy blue chiffon hijab, navy blue dress with white pinstripes, alpine valley and snow-capped mountain background",
    /* 074 */ "medium framing making heart shape gesture near chest, tie-dye chiffon hijab in mauve tones, puff-sleeved blue denim shirt, pink layered skirt, rainbow candy house beach setup background",
    /* 075 */ "full 3/4 framing sitting on orange wooden lawn chair on garden terrace, orange chiffon hijab, orange floral chiffon maxi dress, orange flower pot and umbrella background",
    /* 076 */ "sitting gracefully on green outdoor stone stairs resting chin on hand, ivory chiffon hijab, cream maxi dress with green and purple wildflower prints, bougainvillea alleyway background",
    /* 077 */ "medium shot along wet asphalt road making double finger-heart gestures, beige chiffon hijab, white blouse with black necktie vest, denim jeans, Balinese split gateway (Candi Bentar) background",
    /* 078 */ "medium framing standing on cliffside stone path overlooking ocean making double finger-heart gestures, light sky-blue chiffon hijab, cream knit cardigan with navy scallop edges, denim jeans, coastal rocks background",
    /* 079 */ "medium shot on glass skywalk bridge making double finger-heart gestures, pure white chiffon hijab, white embroidered butterfly jacket, glass floor over canyon cliffs background",
    /* 080 */ "medium framing in cobblestone courtyard path touching chin, chocolate brown chiffon hijab, white blouse with floppy neck bow, brown argyle sweater vest, chocolate brown midi skirt, Greek courtyard background",

    /* 081 */ "sitting gracefully in red armchair on rooftop terrace, deep purple chiffon hijab, rich red-to-purple ombre pleated abaya gown with bell sleeves, oriental red rug, red rose installations overhead background",
    /* 082 */ "sitting on red armchair in rooftop garden resting hands in lap, dark purple silk hijab, pleated ombre dress fading from crimson red to dark plum, red floral arrangements background",
    /* 083 */ "medium close-up sitting in outdoor terrace armchair, dark violet chiffon hijab, textured pleated gradient dress in ruby red and deep wine, red floral canopies background",
    /* 084 */ "3/4 medium framing sitting poised on red chair, deep plum purple hijab, pleated ombre gown transitioning from bright red to deep magenta, hanging red flowers background",
    /* 085 */ "full medium shot seated gracefully on red accent chair hands clasped, dark purple chiffon hijab, crimson-and-plum gradient pleated abaya, terrace with blooming red floral arches background",
    /* 086 */ "3/4 medium framing sitting gracefully in red armchair on terrace, deep-purple chiffon hijab, red-to-plum pleated ombre abaya, dense canopy of red roses overhead background",
    /* 087 */ "seated in red armchair holding serene expression, dark violet silk hijab, red-and-purple pleated ombre dress, hanging red floral installations and oriental red carpet background",
    /* 088 */ "medium framing sitting poised in red armchair on terrace deck, dark purple chiffon hijab, crimson red to plum purple gradient pleated dress, lush red flowers arch background",
    /* 089 */ "3/4 medium shot sitting gracefully in red armchair looking directly at camera, deep plum purple hijab, pleated ombre maxi gown transitioning from red to dark purple, red floral arrangements background",
    /* 090 */ "medium framing seated comfortably on red armchair in rooftop garden, dark purple chiffon hijab, pleated gradient red-and-violet abaya, hanging red rose vines background",

    /* 091 */ "3/4 medium framing sitting gracefully in red armchair on terrace, sleek deep-purple chiffon hijab, red-to-plum pleated ombre abaya with voluminous sleeves, red rose canopy background",
    /* 092 */ "seated in red armchair with hands resting together, dark violet silk hijab, rich red-and-purple pleated ombre dress, hanging red floral installations background",
    /* 093 */ "medium framing sitting poised in red armchair on terrace deck, dark purple chiffon hijab, crimson red to plum purple gradient pleated dress, tropical plants background",
    /* 094 */ "3/4 medium shot sitting gracefully in red armchair with gentle smile, deep plum purple hijab, pleated ombre maxi gown transitioning from red to dark purple, oriental red carpet background",
    /* 095 */ "medium framing seated comfortably on red armchair in rooftop garden, dark purple chiffon hijab, pleated gradient red-and-violet abaya dress, white building and rose vines background",
    /* 096 */ "3/4 medium framing sitting gracefully in red armchair looking softly into camera, deep-purple chiffon hijab, red-to-plum pleated ombre abaya with bell sleeves, red roses canopy background",
    /* 097 */ "seated in red armchair holding serene expression, dark violet silk hijab, red-and-purple pleated ombre dress, hanging red floral arrangements background",
    /* 098 */ "medium framing sitting poised in red armchair on terrace deck, dark purple chiffon hijab, crimson red to plum purple gradient pleated dress, red floral arch background",
    /* 099 */ "3/4 medium shot sitting gracefully in red armchair with gentle smile, deep plum purple hijab, pleated ombre maxi gown, oriental red rug background",
    /* 100 */ "medium framing seated comfortably on red armchair in rooftop garden setting, dark purple chiffon hijab, pleated gradient red-and-violet abaya dress, red rose vines and sleek white building background"
  ];

  // 2. MASTER TEMPLATE SUFFIX & CONFIGURATION (MENGGABUNGKAN TEKS KAMERA & RULES)
  window.PROMPTS_HIJAB = BASE_PROMPTS.map((deskripsiInti) => {
    return `A high-end commercial fashion portrait formatted for a vertical 9:16 layout. The image captures a ${deskripsiInti}. Captured with professional Hasselblad/Sony a7R V camera, 85mm macro lens, ultra-sharp 16k resolution, clean beauty dish studio lighting, showcasing radiant glass-skin texture and soft depth of field. A subtle brand text "TIGAJIWA" is integrated into the bottom corner. And change the face of the woman in this image to look exactly like the face reference photo I uploaded above, strictly following the Master Prompt rules.`;
  });
})();