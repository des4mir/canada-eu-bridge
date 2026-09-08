const fs = require('fs');
let code = fs.readFileSync('src/components/VisitSection.tsx', 'utf8');

const target = `              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};`;

const replacement = `              </div>
            ))}
          </div>
          
          <div className="mt-8 pt-6 border-t border-slate-200">
            <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-100 flex-1 w-full">
              <h4 className="font-bold text-emerald-900 mb-2">{currentLang === "en" ? "Travel Partners" : "Partenaires de voyage"}</h4>
              <p className="text-sm text-emerald-800 mb-4">{currentLang === "en" ? "Ready to plan your trip? Compare flights and accommodation:" : "Prêt à planifier votre voyage ? Comparez les vols et l'hébergement :" }</p>
              <div className="flex flex-wrap gap-4">
                <AffiliateLink url="https://www.booking.com/" partnerName="Booking.com" buttonText={currentLang === "en" ? "Check Hotel Prices" : "Voir les prix des hôtels"} />
                <AffiliateLink url="https://www.skyscanner.com/" partnerName="Skyscanner" buttonText={currentLang === "en" ? "Compare Flights" : "Comparer les vols"} />
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};`;

code = code.replace(target, replacement);
fs.writeFileSync('src/components/VisitSection.tsx', code);
