import CategoryCard from "@/components/custom-components/CategoryCard";
import bracelets from "../../../assets/img/category/bracelets.jpg";
import earrings from "../../../assets/img/category/earrings.jpg";
import necklaces from "../../../assets/img/category/necklaces.jpg";
import rings from "../../../assets/img/category/rings.jpg";
import gold from "../../../assets/img/category/gold-set.jpg";
import silver from "../../../assets/img/category/silver-set.jpg";
const Category = () => {
    const categories = [
        ["bracelets", bracelets],
        ["necklaces", necklaces],
        ["earrings", earrings],
        ["rings", rings],
        ["gold-set", gold],
        ["silver-set", silver],
    ];
    return (
        <>
            <div className="grid grid-cols-6 gap-x-5 border-y-2 mt-1 py-5 border-[#e9ecef]">
                {categories.map((category) => (
                    <CategoryCard
                        key={category[0]}
                        category={category[0]}
                        ImgSrc={category[1]}
                    />
                ))}
            </div>
        </>
    );
};

export default Category;
