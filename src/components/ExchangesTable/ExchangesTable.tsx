import { FC, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Exchange } from "@/types";
import { COIN_GECKO_URL } from "@/constants";
import { roundNumberAndCovertToLocale } from "utils/numbers";
import Loader from "../Loader";

const ExchangesTable: FC = () => {
  const [exchanges, setExchanges] = useState<Exchange[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchExchanges = async () => {
      const response = await fetch(`${COIN_GECKO_URL}/exchanges/?per_page=10`);
      const data = await response.json();
      setExchanges(data);
      setIsLoading(false);
    };
    setIsLoading(true);

    try {
      fetchExchanges();
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  }, []);

  if (isLoading) return <Loader />;

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr className="tr">
            <th className="th">#</th>
            <th className="th">Name</th>
            <th className="th">Trust Score</th>
            <th className="th">24h Volume</th>
            <th className="th">Country</th>
            <th className="th">URL</th>
          </tr>
        </thead>

        <tbody className="tbody">
          {exchanges.map((exchange) => (
            <tr key={exchange.id} className="tr">
              <td className="td">{exchange.trust_score_rank}</td>
              <td className="td">
                <div className="flex-items-center">
                  <img
                    src={exchange.image}
                    alt={exchange.name}
                    width={20}
                    height={20}
                  />

                  <Link to={`/${exchange.id}`} className="name-link">
                    {exchange.name}
                  </Link>
                </div>
              </td>
              <td className="td text-center">{exchange.trust_score}</td>
              <td className="td  text-center">
                {roundNumberAndCovertToLocale(
                  exchange.trade_volume_24h_btc_normalized,
                )}{" "}
                BTC
              </td>
              <td className="td">{exchange.country}</td>
              <td className="td">
                <a href={exchange.url} target="_blank">
                  {exchange.url}
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExchangesTable;
